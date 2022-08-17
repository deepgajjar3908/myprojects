import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import { AuthService } from 'src/app/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
private readonly notifier:NotifierService
  constructor(private auth:AuthService, private notifireservice:NotifierService) {
    this.notifier=notifireservice;
   }

  ngOnInit(): void {
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  logout(){
    this.auth.logout()
    this.showNotification('success', 'Logout Successfully');
  }

  showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }
}