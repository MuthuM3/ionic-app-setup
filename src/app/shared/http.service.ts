import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToasterService } from './toaster.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

const options = {
  headers: {
    'content-type': 'application/json',
   // Origin: 'http://localhost:8100',
  },
  withCredentials: true,
};

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private toasterService: ToasterService,
    private ToastController: ToastController,
    private router: Router,
  ) {}

  apiUrl: any = environment.apiUrl;
  // apiUrl: any;

  getApiUrl(value: string) {
    // this.apiUrl = value;
  }

  get(url: string): Observable<any> {
    return this.http.get(this.apiUrl + url, options).pipe(
      catchError((error) => {
        let errorMessage: string | undefined;
        if (error.error) {
          errorMessage = error.error.responseObject;
        } else if (error.error.responseCode === 440) {
          // The backend returned an unsuccessful response code.
          errorMessage = error.error.responseObject;
        }
        this.toasterService.showError(errorMessage);
        // Return an observable with a user-facing error message.
        return throwError(() => JSON.stringify(error));
      }),
    );
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(this.apiUrl + url, data, options).pipe(
      catchError((error) => {
        let errorMessage: string | undefined;
        if (error.error) {
          errorMessage = error.error.responseObject;
        } else if (error.error.responseCode === 440) {
          // The backend returned an unsuccessful response code.
          errorMessage = error.error.responseObject;
        }
        this.toasterService.showError(errorMessage);
        // Return an observable with a user-facing error message.
        return throwError(() => JSON.stringify(error));
      }),
    );
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(this.apiUrl + url, data, options).pipe(
      catchError((error) => {
        let errorMessage: string | undefined;
        if (error.error) {
          errorMessage = error.error.responseObject;
        } else if (error.error.responseCode === 440) {
          // The backend returned an unsuccessful response code.
          errorMessage = error.error.responseObject;
        }
        this.toasterService.showError(errorMessage);
        // Return an observable with a user-facing error message.
        return throwError(() => JSON.stringify(error));
      }),
    );
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.apiUrl + url, options).pipe(
      catchError((error) => {
        let errorMessage: string | undefined;
        if (error.error) {
          errorMessage = error.error.responseObject;
        } else if (error.error.responseCode === 440) {
          // The backend returned an unsuccessful response code.
          errorMessage = error.error.responseObject;
        }
        this.toasterService.showError(errorMessage);
        // Return an observable with a user-facing error message.
        return throwError(() => JSON.stringify(error));
      }),
    );
  }
}
