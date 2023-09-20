import { catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from '../shared/http.service';

@Injectable({
  providedIn: 'root',
})
export class GetcoredataService {
  originCode: any;
  destiniCode: any;
  constructor(private http: HttpService) {
    // console.log('core data from service-----');

    this.fetchCoreData();
  }

  fetchCoreData() {
    this.http.get('getcoredata').subscribe((res) => {
      this.originCode = this.removeDuplicatesByProperty(res.flights, 'origin');
      this.destiniCode = this.removeDuplicatesByProperty(
        res.flights,
        'destination'
      );
      // console.log(' this.originCode',  this.originCode);

    },err => {
      // console.log('Error in getcoredata',JSON.stringify(err));
    });
  }

  removeDuplicatesByProperty(array: any, property: string) {
    const seenValues = new Set();
    return array.filter((obj: any) => {
      if (!seenValues.has(obj[property])) {
        seenValues.add(obj[property]);
        return true;
      }
      return false;
    });
  }

}
