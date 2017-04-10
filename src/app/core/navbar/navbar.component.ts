import { Component, HostListener } from '@angular/core';
import { AppConfig } from 'app/config/app.config';
import {Submenu} from "./submenu";

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {

  homeLogo = AppConfig.HOME_LOGO;
  menuState : number;
  langSubMenu : Submenu;
  userSubMenu : Submenu;
  authenticated : boolean;

  constructor() {
    this.menuState = 1;
    this.langSubMenu = new Submenu(['Action', 'Another Action', 'Something Else']);
    this.userSubMenu = new Submenu(['Profile', 'Event History', 'Upload', 'Log Out']);
    this.authenticated = true;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.menuState = 1;
    this.langSubMenu.subMenuState = 1;
    this.userSubMenu.subMenuState = 1;
  }

  toggleMenuState() {
    if (this.menuState === 2) {
      this.langSubMenu.subMenuState = 1;
      this.userSubMenu.subMenuState = 1;
    }
    this.menuState = this.menuState === 1 ? 2 : 1;
    console.log('this.menuState === ' + this.menuState);
  }

  isMenuExpanded() {
    console.log('isMenuExpanded => this.menuState === ' + this.menuState);
    return this.menuState === 2;
  }
}
