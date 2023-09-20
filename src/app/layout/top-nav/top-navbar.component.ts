import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController, NavController } from '@ionic/angular';
import { AuthAclService } from 'src/app/shared/auth-acl.service';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],

})
export class TopNavbarComponent implements OnInit {

  @Input() title: string = '';

  isMoreMenu = false;
  isAirBillMenu = false;
  isFlightOperaMenu = false;
  isReportMenu = false;
  isSalesMenu = false;
  isRateManagerMenu = false;
  isFinanceMenu = false;
  isUldMenu = false;
  isCrmMenu = false;
  isPlus: boolean = true;
  isMinus: boolean = false;
  isParent: boolean = false;
  isChild: boolean = false;

  aclData: any;
  isUser: any;
  constructor(private router: Router, public menuCtrl: MenuController, public aclService: AuthAclService, private Nav: NavController) {
    this.isUser = sessionStorage.getItem('isloggedIn');

    let getacl: any = sessionStorage.getItem('currentuser');

    this.aclData = JSON.parse(getacl);
    
  }

  ngOnInit() {
    console.log("Reloading TopNav");
    this.isMoreMenu = this.title === 'Cargo';
  }

  setOpen(isOpen: boolean) {
    this.isMoreMenu = isOpen;
    this.isAirBillMenu = isOpen;
  }

  toRedirect(url: any) {
    this.router.navigateByUrl(url);
  }

  openMenu() {
    this.menuCtrl.open('start');
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  backbtn() {
    // window.history.back();
    this.Nav.back();
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}
