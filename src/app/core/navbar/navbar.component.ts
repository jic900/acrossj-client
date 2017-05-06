import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2,
  HostListener,
  ViewChild,
} from '@angular/core';

import { SearchMenuComponent } from './searchmenu/searchmenu.component';
import { AppConfig, AppConstant } from 'app/config/app.config';
import { MenuState } from 'app/config/menu.config';
import { SideMenuComponent } from './sidemenu/sidemenu.component';

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChild(SideMenuComponent) sideMenu: SideMenuComponent;
  @ViewChild(SearchMenuComponent) searchMenu: SearchMenuComponent;
  homeLogo: string;
  windowWidth: number;
  authenticated: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.homeLogo = AppConfig.HOME_LOGO;
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    this.setAuthenticated(true);
    this.toggleTransition(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      if (this.windowWidth >= AppConstant.DEFAULT_DEVICE_WIDTH) {
        if (this.sideMenu.isSideMenuExpanded()) {
          this.sideMenu.setSideMenuState(MenuState.collapsed);
        }
        if (this.searchMenu.isSearchMenuExpanded()) {
          this.searchMenu.setSearchMenuState(MenuState.collapsed);
        }
      }
      this.toggleTransition(this.windowWidth);
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

  private toggleTransition(width: number): void {
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.renderer.addClass(this.elementRef.nativeElement.firstChild, 'no-transition');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement.firstChild, 'no-transition');
    }
  }
}
