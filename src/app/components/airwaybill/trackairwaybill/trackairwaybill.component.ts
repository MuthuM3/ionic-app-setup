import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpService } from 'src/app/shared/http.service';
import { TopNavbarComponent } from "../../../layout/top-nav/top-navbar.component";
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-trackairwaybill',
  templateUrl: './trackairwaybill.component.html',
  styleUrls: ['./trackairwaybill.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, TopNavbarComponent]
})
export class TrackairwaybillComponent implements OnInit {
  title: string = 'Air Waybill Tracking';

  trackingData: any = [];
  airBillForm: FormGroup | any;
  isLoader: boolean = false;
  isErr: boolean = false;
  bookAcceptData: any = [];
  flightDetailRes: any;

  constructor(private http: HttpService, private fb: FormBuilder, private utilService: UtilService) { }

  ngOnInit() {
    this.airBillForm = this.fb.group({
      iata_number: ['', Validators.required],
      airBill_number: ['', Validators.required],
    });
  }


  getTrackData() {
    let awbno: any = this.airBillForm.value.airBill_number;
    // console.log("LOG awbno ", awbno);

    var iataAndAwbNoObj: any = this.utilService.getIataNoAndAirwaybilNo(awbno);
    // console.log("iataAndAwbNoObj : " + JSON.stringify(iataAndAwbNoObj))
    var iataNo = iataAndAwbNoObj.iataNo;
    let awbNo = iataAndAwbNoObj.awbNo;
    let data = [];

    if (awbNo) {
      data.push({
        fieldName: "awbNo",
        operator: "=",
        value: "'" + awbNo + "'"
      })
    }
    if (iataNo) {
      data.push({
        fieldName: "airlineIATA",
        operator: "=",
        value: "'" + iataNo + "'"
      })
    }

    let flightId = '';
    this.flightDetailRes = this.http.post(`airwaybill/search/`, data).subscribe(res => {
      // console.log('res',res);
      flightId = res[0].id;
      this.isLoader = true;
      if (flightId) {
        this.http.get(`airwaybillstatus/lookupfield/awbid/${flightId}`).subscribe(res => {
          console.log('res', res);
          this.isLoader = false;
          this.bookAcceptData = res;
          this.trackingData = res;
          // res.map((data: any,) => {
          //   if (data.status === 'DRAFT' || data.status === 'RECEIVED_FROM_SHIPPER') {
          //     this.bookAcceptData.push(data);
          //   }
          //   if (!(data.status === 'DRAFT' || data.status === 'RECEIVED_FROM_SHIPPER')) {
          //     this.trackingData.push(data);
          //   }
          // })
        })
      }
    })

  }
}
