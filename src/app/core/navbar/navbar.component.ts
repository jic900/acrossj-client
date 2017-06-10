import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2,
  HostListener,
  ViewChild
} from '@angular/core';

import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { SearchMenuComponent } from './search/searchmenu/searchmenu.component';
import { AppConstant, MenuState } from 'app/config/app.config';
import { NavbarConfig } from 'app/config/navbar.config';


@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChild(SideMenuComponent) sideMenu: SideMenuComponent;
  @ViewChild(SearchMenuComponent) searchMenu: SearchMenuComponent;
  navbarConfig: {};
  windowWidth: number;
  authenticated: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.navbarConfig = NavbarConfig;
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    this.setAuthenticated(false);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      if (this.windowWidth >= AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT) {
        this.sideMenu.setSideMenuState(MenuState.collapsed);
        this.searchMenu.setSearchMenuState(MenuState.collapsed);
      }
      this.searchMenu.setFieldWidth();
    }
  }

  setAuthenticated(isAuthenticated: boolean) {
    this.authenticated = isAuthenticated;
    this.sideMenu.setAuthenticated(isAuthenticated);
  }

  onSideMenuButtonClick(event): void {
    if (this.searchMenu.isSearchMenuExpanded()) {
      this.searchMenu.setSearchMenuState(MenuState.collapsed);
    }
    this.sideMenu.toggleSideMenuState();
  }

  onSearchMenuButtonClick(event): void {
    if (this.sideMenu.isSideMenuExpanded()) {
      this.sideMenu.setSideMenuState(MenuState.collapsed);
    }
    this.searchMenu.toggleSearchMenuState();
  }
}
