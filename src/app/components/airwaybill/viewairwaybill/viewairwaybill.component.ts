import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TopNavbarComponent } from '../../../layout/top-nav/top-navbar.component';
import { BottomNavbarComponent } from '../../../layout/bottom-nav/bottom-navbar.component';
import { HttpService } from 'src/app/shared/http.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { DatepickerComponent } from 'src/app/common-components/datepicker/datepicker.component';
import { DropdownComponent } from 'src/app/common-components/dropdown/dropdown.component';
import { UtilService } from 'src/app/services/util.service';
import { GetcoredataService } from 'src/app/services/getcoredata.service';

@Component({
  selector: 'app-viewairwaybill',
  templateUrl: './viewairwaybill.component.html',
  styleUrls: ['./viewairwaybill.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TopNavbarComponent,
    BottomNavbarComponent,
    ReactiveFormsModule,
    DatepickerComponent,
    DropdownComponent,
  ],
  providers: [DatePipe],
})
export class ViewairwaybillComponent implements OnInit {
  title: string = 'Manage Air Waybill';

  isOpen: boolean = true;

  awbNo: any = new FormControl('');
  issueDateFrom: any;
  issueDateTo: any;
  searchAirWayBill: any;
  isOriginList: boolean = false;
  isDestiniList: boolean = false;
  flightData: any;
  originVal: string = '';
  destinationVal: string = '';
  originBodyVal: string = '';
  destiniBodyVal: string = '';

  @ViewChild(DatepickerComponent) datePicComp: DatepickerComponent | any;

  constructor(
    private http: HttpService,
    private fb: FormBuilder,
    private utilService: UtilService,
    private datePipe: DatePipe,
    private getCoreService: GetcoredataService
  ) {}

  ngOnInit() {
    let date = new Date(new Date().setDate(new Date().getDate() - 7));
    this.issueDateFrom = date.toISOString();
    this.issueDateTo = new Date().toISOString();
    this.accountDetaultData();
  }

  accountDetaultData() {
    let accountId = sessionStorage.getItem('accountId');

    this.http.get('accountdefaults').subscribe((res) => {
      res.filter((data: any) => {
        if (data.accountId == accountId) {
          this.originVal = data.defaultDepartureAirport;
          this.originBodyVal = data.defaultDepartureAirport;
          // console.log(this.selectValue);
        }
      });
    });
  }

  handleInput(event: any) {
    if (event.detail.value) {
      const query = event.target.value.toLowerCase();
      if (event.target.label == 'Origin') {
        this.flightData = this.getCoreService.originCode.filter(
          (d: any) => d.origin.toLowerCase().indexOf(query) > -1
        );
        this.isOriginList = true;
        this.isDestiniList = false;
      } else if (event.target.label == 'Destination') {
        this.flightData = this.getCoreService.destiniCode.filter(
          (d: any) => d.destination.toLowerCase().indexOf(query) > -1
        );
        this.isOriginList = false;
        this.isDestiniList = true;
      }
    } else {
      this.isOriginList = false;
      this.isDestiniList = false;
    }
  }

  onSelect(origin: string, name: string, field: string) {
    // this.dropDownEmit.emit({ origin: origin, originName: name, field: field });
    this.originVal = origin;
  }

  selectDropDown(e: any) {
    if (e.field === 'origin') {
      this.originVal = `${e.origin} - (${e.originName})`;
      this.originBodyVal = e.origin;
      this.isOriginList = false;
    } else if (e.field === 'destination') {
      this.destinationVal = `${e.origin} - (${e.originName})`;
      this.destiniBodyVal = e.origin;
      this.isDestiniList = false;
    }
  }

  selectDate(event: any) {
    if (event.target.id === 'datetime1') {
      this.issueDateFrom = event.detail.value;
    } else if (event.target.id === 'datetime2') {
      this.issueDateTo = event.detail.value;
    }
  }

  onSubmit() {
    let awbReq = this.awbNo.value;
    let awbNo;
    let iataNo;

    if (awbReq && awbReq.indexOf('-') > -1) {
      iataNo = awbReq.split('-')[0];
      awbNo = awbReq.split('-')[1];
    } else {
      awbNo = awbReq;
    }

    let obj = {
      awbNo: awbNo,
      iataNo: iataNo,
      isseuDateFrom: this.datePipe.transform(this.issueDateFrom, 'yyyy-dd-MM'),
      isseuDateTo: this.datePipe.transform(this.issueDateTo, 'yyyy-dd-MM'),
      origin: this.originBodyVal,
      destination: this.destiniBodyVal,
    };

    let body: any = [];

    if (obj.awbNo) {
      body.push({
        fieldName: 'awbNo',
        operator: '=',
        value: "'" + obj.awbNo + "'",
      });
    }

    if (obj.iataNo) {
      body.push({
        fieldName: 'airlineIATA',
        operator: '=',
        value: "'" + obj.iataNo + "'",
      });
    }

    if (obj.isseuDateFrom) {
      body.push({
        fieldName: 'dateIssued',
        operator: '>=',
        value: "'" + obj.isseuDateFrom + "'",
      });
    }

    if (obj.isseuDateTo) {
      body.push({
        fieldName: 'dateIssued',
        operator: '<',
        value: "'" + obj.isseuDateTo + "'",
      });
    }

    if (obj.origin) {
      body.push({
        fieldName: 'origin',
        operator: '=',
        value: "'" + obj.origin + "'",
      });
    }

    if (obj.destination) {
      body.push({
        fieldName: 'destination',
        operator: '=',
        value: "'" + obj.destination + "'",
      });
    }

    console.log(body);

    this.http.post('airwaybillinfo/search/', body).subscribe((res) => {
      console.log('res', res);
      this.searchAirWayBill = res;
      this.originBodyVal = '';
      this.destiniBodyVal = '';
      this.awbNo.reset();
      this.originVal = '';
      this.destinationVal = '';
    });

    // if (!(obj.awbNo || obj.iataNo)) {
    //   this.http.get('airwaybillinfo').subscribe((res) => {
    //     console.log(res);

    //     this.searchAirWayBill = res;
    //   });

    // }
  }
}
