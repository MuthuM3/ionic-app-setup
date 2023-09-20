import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpService } from 'src/app/shared/http.service';
import { LoginService } from '../../services/login.service';
import { DropdownComponent } from 'src/app/common-components/dropdown/dropdown.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    DropdownComponent,
    HttpClientModule,
  ],
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true;
  isSearchAirBill: boolean = false;
  isTrackingStatus: boolean = false;
  isForgotPassword: boolean = false;
  selectedValue: string | undefined;
  trackingData: any = [];
  isErr: boolean = false;
  isLoginLoader: boolean = false;
  isSearchLoader: boolean = false;
  bookAcceptData: any = [];

  loginForm: FormGroup | any;
  airBillForm: FormGroup | any;

  loginRes: any;
  isNotUser: any = '';
  isLoginField: boolean = false;
  // isNotUser: boolean = false;
  airline: any;
  isAirline: boolean = false;
  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    public loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.airBillForm = this.fb.group({
      iata_number: ['', Validators.required],
      airBill_number: ['', Validators.required],
    });

    this.airline = [
      {
        name: 'CargoDemo',
        url: 'https://cargodemo.proverne.com/cargo/services/',
      },
      {
        name: 'QuikJet',
        url: 'https://qo-test.proverne.com/cargo/services/',
      },
    ];
  }

  onHide(input: any) {
    if (input == 'airBill') {
      this.isSearchAirBill = true;
      this.isLogin = false;
      this.isTrackingStatus = false;
      this.isForgotPassword = false;
    } else if (input == 'login') {
      this.isLogin = true;
      this.isSearchAirBill = false;
      this.isTrackingStatus = false;
      this.isForgotPassword = false;
    } else if (input == 'forgot') {
      this.isForgotPassword = true;
      this.isLogin = false;
      this.isSearchAirBill = false;
      this.isTrackingStatus = false;
    }
  }

  async onSubmitLogin() {
    console.log('Post Login btn-------------');
    const body = {
      userEmail: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.isLoginLoader = true;
    this.http.post('accountuser/login', body).subscribe((res: any) => {
      this.isLoginLoader = false;
      this.loginRes = res;
      let loginTime: any = new Date();

      sessionStorage.setItem('accountId', res.accountId);
      sessionStorage.setItem('logintime', loginTime);
      sessionStorage.setItem('isloggedIn', 'true');
      sessionStorage.setItem('userLoggedIn', 'validUser');
      sessionStorage.setItem('currentuser', JSON.stringify(res));

      this.router.navigateByUrl('home');
    });
    this.isLoginLoader = false;
  }

  getTrackData() {
    const iataNum = this.airBillForm.value.iata_number;
    const airBill_number = this.airBillForm.value.airBill_number;

    if (!iataNum && !airBill_number) {
      this.isErr = true;
      return;
    } else {
      this.isSearchLoader = true;
    }
    if (iataNum && airBill_number) {
      this.http
        .get(`trackawb/${iataNum}/${airBill_number}`)
        .subscribe((res: any) => {
          // debugger
          res.map((data: any) => {
            if (
              data.airwaybillStatus === 'DRAFT' ||
              data.airwaybillStatus === 'RECEIVED_FROM_SHIPPER'
            ) {
              this.bookAcceptData.push(data);
            }
            if (
              !(
                data.airwaybillStatus === 'DRAFT' ||
                data.airwaybillStatus === 'RECEIVED_FROM_SHIPPER'
              )
            ) {
              this.trackingData.push(data);
            }
          });

          if (res.length) {
            this.isSearchLoader = false;
            this.isTrackingStatus = true;
            this.isLogin = false;
            this.isSearchAirBill = false;
            this.airBillForm.reset();
            this.isErr = false;
          } else {
            this.isSearchLoader = false;
          }
        });
    }
  }
  onSelectAirline(e: any) {
    this.http.getApiUrl(e.detail.value);
    if (e.detail.value) {
      this.isAirline = true;
    }
  }
}
