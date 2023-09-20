import { NgIf } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, IonicModule, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class BottomNavbarComponent implements OnInit {
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

  @ViewChild('ion-modal') modal: IonModal | any;
  constructor(private router: Router, private menuCtrl: MenuController) {}

  ngOnInit() {}

  setOpen(isOpen: boolean) {
    this.isMoreMenu = isOpen;
    this.isAirBillMenu = isOpen;
  }

  onExpand() {
    this.isChild = !this.isChild;
    if (this.isChild) {
      this.isMinus = true;
      this.isPlus = false;
    } else {
      this.isMinus = false;
      this.isPlus = true;
    }
  }

  toRedirect(url: any) {
    this.router.navigateByUrl(url);
    this.modal.dismiss();
  }

  openEndMenu() {
    // Open the menu by side
    this.menuCtrl.open('end');
    this.menuCtrl.close();
  }
}
