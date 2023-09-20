import { Component, OnInit } from '@angular/core';

import { TopNavbarComponent } from "../../layout/top-nav/top-navbar.component";
import { BottomNavbarComponent } from "../../layout/bottom-nav/bottom-navbar.component";
import { AuthAclService } from 'src/app/shared/auth-acl.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ TopNavbarComponent, BottomNavbarComponent]
})
export class HomeComponent  implements OnInit {
  title: string = 'Cargo';

  constructor(private authAcl: AuthAclService) { }

  ngOnInit() {
  }

}
