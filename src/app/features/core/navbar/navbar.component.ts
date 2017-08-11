import {
  Component,
  AfterViewInit,
  HostListener,
  ViewChild
} from '@angular/core';
import * as _ from 'lodash';

import { NavBarConfig } from 'app/config/core/navbar.config';
import { AppConstant } from 'app/config/common/app-constant.config';
import { MenuState } from 'app/config/common/menustate.config';
import { IImageElement } from 'app/config/interfaces/image-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { SideMenuComponent } from './sidemenu/sidemenu.component';
import { SearchMenuComponent } from './search/searchmenu/searchmenu.component';

interface INavBar {
  logo: IImageElement;
  searchButton: IElement;
}

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements AfterViewInit {

  navbarData: INavBar;
  @ViewChild(SideMenuComponent) sideMenu: SideMenuComponent;
  @ViewChild(SearchMenuComponent) searchMenu: SearchMenuComponent;
  windowWidth: number;

  constructor() {
    this.navbarData = _.mapKeys(new NavBarConfig().elements, 'name');
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
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
