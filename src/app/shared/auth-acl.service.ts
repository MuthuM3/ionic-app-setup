import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthAclService {
  isUser: any;
  constructor() {

  }

  isAuthenticated(): any {
    this.isUser = sessionStorage.getItem('isloggedIn');

    if (this.isUser) {
      return true;
    }
  }
}
