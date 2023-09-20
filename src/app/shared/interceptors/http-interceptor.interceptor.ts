import {Injectable, ViewChild} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import {Observable, catchError, of, tap} from 'rxjs';
import { ToasterService } from "../toaster.service";
import {environment} from 'src/environments/environment';
import {HttpErrorService} from '../http-error.service';
import {LoginComponent} from "../../components/login/login.component";

/*@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiUrl: any = environment.apiUrl + request.url;
    const apiReq = request.clone({
      url: `${apiUrl}/${request.url}`,
      headers: request.headers.set('content-type', 'application/json'),
      withCredentials: true
    });

    return next.handle(apiReq);
  }
}
*/
// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private errorHandler: HttpErrorService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     console.log("Interceptor : COOKIE : "+request.headers.get("Cookie"));
//     return next.handle(request);
//     /*.pipe(
//       tap({
//         next: () => null,
//         error: (error: HttpErrorResponse) => {
//           console.log(
//             'the interceptor has caught an error, process it here',
//             error
//           );
//         },
//       }));*/
//     /*.pipe(
//       catchError((error: HttpErrorResponse) => {
//         return of(error);
//       })
//     );*/
//   }
// }

// export const HttpInterceptor: HttpInterceptorFn = (request, next) => {
//
//   // const apiUrl: any = sessionStorage.getItem('AirlineUrl');
//   const apiUrl: any = 'https://cargodemo.proverne.com/cargo/services';
//   const httpReq = request.clone({
//     url: `${apiUrl}/${request.url}`,
//     headers: request.headers.set('content-type', 'application/json'),
//     withCredentials: true,
//   });
//
//   return next(httpReq).pipe(
//     tap({
//       next: () => null,
//       error: (error: HttpErrorResponse) => {
//         let errorMessage: any;
//         if (error.error instanceof ErrorEvent) {
//           // A client-side or network error occurred.
//           errorMessage = `Client error: ${error?.error?.responseObject}`;
//         } else {
//           // The backend returned an unsuccessful response code.
//           errorMessage = `Server error: ${error.status}, ${error.statusText}`;
//         }
//         const toaster = new ToasterService(errorMessage);
//         toaster.showError(errorMessage);
//         console.log(
//           error
//         );
//       },
//     })
//   );
// };
