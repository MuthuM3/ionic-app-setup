import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  error: any
  constructor() { }

  handleError(error: HttpErrorResponse) {
    console.log('API Error:', error);

    let errorMessage = 'An error occurred. Please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${JSON.stringify(error.error.message)}`;
    } else if (error.status === 404) {
      errorMessage = 'Resource not found.';
    } else if (error.status === 500) {
      errorMessage = 'Internal server error.';
    }

    return new Error(errorMessage);
  }
}
