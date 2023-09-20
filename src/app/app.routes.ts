import { Routes } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'openairwaybill',
    loadComponent: () =>
      import(
        './components/airwaybill/viewairwaybill/viewairwaybill.component'
      ).then((m) => m.ViewairwaybillComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'trackairwaybill',
    loadComponent: () =>
      import(
        './components/airwaybill/trackairwaybill/trackairwaybill.component'
      ).then((m) => m.TrackairwaybillComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'flightoperation',
    loadComponent: () =>
      import(
        './components/flightoperation/viewflight/viewflight.component'
      ).then((m) => m.ViewflightComponent),
    canActivate: [AuthGuard],
  },
];
