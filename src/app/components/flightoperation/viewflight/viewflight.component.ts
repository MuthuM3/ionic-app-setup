import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DatepickerComponent } from 'src/app/common-components/datepicker/datepicker.component';
import { DropdownComponent } from 'src/app/common-components/dropdown/dropdown.component';
import { TopNavbarComponent } from 'src/app/layout/top-nav/top-navbar.component';
import { GetcoredataService } from 'src/app/services/getcoredata.service';
import { HttpService } from '../../../shared/http.service';

@Component({
  selector: 'app-viewflight',
  templateUrl: './viewflight.component.html',
  styleUrls: ['./viewflight.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    TopNavbarComponent,
    ReactiveFormsModule,
    FormsModule,
    DropdownComponent,
    DatepickerComponent,
  ],
  providers: [DatePipe],
})
export class ViewflightComponent implements OnInit {
  title: string = 'Flight OPS Management';
  isOriginList: boolean = false;
  isDestiniList: boolean = false;
  flightData: any;
  originVal: string = '';
  destinationVal: string = '';
  originBodyVal: string = '';
  destiniBodyVal: string = '';
  departureDate: any;
  departureStartTime: string = '00:00';
  departureEndTime: string = '23:59';

  constructor(
    private getCoreService: GetcoredataService,
    private http: HttpService,
    private datePipe: DatePipe,
  ) {}

  ngOnInit() {
    this.accountDetaultData();
    this.departureDate = new Date().toISOString();
    console.log('time', this.departureDate)
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
          (d: any) => d.origin.toLowerCase().indexOf(query) > -1,
        );
        this.isOriginList = true;
        this.isDestiniList = false;
      } else if (event.target.label == 'Destination') {
        this.flightData = this.getCoreService.destiniCode.filter(
          (d: any) => d.destination.toLowerCase().indexOf(query) > -1,
        );
        this.isOriginList = false;
        this.isDestiniList = true;
      }
    } else {
      this.isOriginList = false;
      this.isDestiniList = false;
    }
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
    if (event.target.id === 'datetime3') {
      this.departureDate = event.detail.value;
    }
  }

  onLoadFlight() {
    const startDateTime = new Date(this.departureDate.year, this.departureDate.month - 1, this.departureDate.day, parseInt(this.departureStartTime.substring(0, 2)), parseInt(this.departureStartTime.substring(3, 5)));
    const endDateTime = new Date(this.departureDate.year, this.departureDate.month - 1, this.departureDate.day, parseInt(this.departureEndTime.substring(0, 2)), parseInt(this.departureEndTime.substring(3, 5)));

    console.log('startDateTime', startDateTime);
    console.log('endDateTime', endDateTime);


    let obj = {
      departureDateFrom: this.departureDate,
      departureDateTo: this.departureDate,
      origin: this.originBodyVal,
      destination: this.destiniBodyVal,
    };

    let body: any = [];

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

    if (obj.departureDateFrom) {
      body.push({
        fieldName: 'scheduledDepartureTimeUTC',
        operator: '>=',
        value: "'" + obj.departureDateFrom + "'",
      });
    }

    if (obj.departureDateTo) {
      body.push({
        fieldName: 'scheduledDepartureTimeUTC',
        operator: '<=',
        value: "'" + obj.departureDateTo + "'",
      });
    }

    console.log('body', body);
    this.http.post('flightMessageStatus/search', body).subscribe((res) => {
      console.log('flight management', res);
    });
  }
}
