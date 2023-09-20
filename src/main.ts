import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';
// import {HttpInterceptor} from "./app/shared/interceptors/http-interceptor.interceptor";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    // {
    //   provide: { RouteReuseStrategy, HTTP_INTERCEPTORS },
    //   useClass: ErrorInterceptor,
    //   multi: true,
    // },
    // importProvidersFrom(HttpClientModule),
    importProvidersFrom(IonicModule.forRoot({}), HttpClientModule),
    provideRouter(routes),
    provideAnimations(),
    // provideHttpClient(
    //   withInterceptors([HttpInterceptor])
    // ),
  ],
});
