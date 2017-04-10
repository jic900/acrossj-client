import { Component, HostListener } from '@angular/core';
import { AppConfig } from 'app/config/app.config';
import { Submenu } from "./submenu";
import { MenuState } from "./MenuState";

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {

  homeLogo : string;
  menuState : number;
  langSubMenu : Submenu;
  userSubMenu : Submenu;
  authenticated : boolean;

  constructor() {
    this.homeLogo = AppConfig.HOME_LOGO;
    this.menuState = MenuState.collapsed;
    this.langSubMenu = new Submenu(['Action', 'Another Action', 'Something Else']);
    this.userSubMenu = new Submenu(['Profile', 'Event History', 'Upload', 'Log Out']);
    this.authenticated = false;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.menuState = MenuState.collapsed;
    this.langSubMenu.subMenuState = MenuState.collapsed;
    this.userSubMenu.subMenuState = MenuState.collapsed;
  }

  toggleMenuState() {
    if (this.menuState === MenuState.expanded) {
      this.langSubMenu.subMenuState = MenuState.collapsed;
      this.userSubMenu.subMenuState = MenuState.collapsed;
    }
    this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    console.log('this.menuState === ' + this.menuState);
  }

  isMenuExpanded() {
    console.log('isMenuExpanded => this.menuState === ' + this.menuState);
    return this.menuState === MenuState.expanded;
  }
}
