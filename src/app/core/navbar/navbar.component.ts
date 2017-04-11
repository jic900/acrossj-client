import { Component, HostListener, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { AppConfig } from 'app/config/app.config';
import { SubMenuDef } from 'app/config/app.config';
import { SubmenuComponent } from "app/core/navbar/submenu.component";
import { MenuState } from "./MenuState";


@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChildren(SubmenuComponent) submenus :QueryList<SubmenuComponent>;
  userSubMenu : SubmenuComponent;
  langSubMenu : SubmenuComponent;
  homeLogo : string;
  menuState : number;
  authenticated : boolean;

  constructor() {
    this.homeLogo = AppConfig.HOME_LOGO;
    this.menuState = MenuState.collapsed;
    this.authenticated = true;
  }

  ngAfterViewInit(): void {
    console.log(this.submenus.length);
    this.userSubMenu = this.submenus.find(function(submenu) {
      return submenu.linkName === 'Username';
    });
    this.langSubMenu = this.submenus.find(function(submenu) {
      return submenu.linkName === 'Language';
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.menuState = MenuState.default;
    this.userSubMenu.subMenuState = MenuState.collapsed;
    this.langSubMenu.subMenuState = MenuState.collapsed;
  }

  toggleMenuState() {
    if (this.menuState === MenuState.expanded) {
      if (this.userSubMenu !== undefined) {
        this.userSubMenu.subMenuState = MenuState.collapsed;
      }
      this.langSubMenu.subMenuState = MenuState.collapsed;
    }
    this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    console.log('this.menuState === ' + this.menuState);
  }

  isMenuExpanded() {
    console.log('isMenuExpanded => this.menuState === ' + this.menuState);
    return this.menuState === MenuState.expanded;
  }
}
