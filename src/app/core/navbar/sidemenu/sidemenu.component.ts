import {
  Component,
  ViewChildren,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';

import { SubMenuComponent } from './submenu/submenu.component';
import { AppConstant, MenuState, SubMenuDef } from 'app/config/app.config';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})

export class SideMenuComponent {

  @ViewChildren(SubMenuComponent) submenus: QueryList<SubMenuComponent>;
  sideMenuState: number;
  authenticated: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.sideMenuState = MenuState.collapsed;
    this.authenticated = false;
  }

  isSideMenuExpanded(): boolean {
    return this.sideMenuState === MenuState.expanded;
  }

  getSubMenuData(type: string) {
    if (type === 'language') {
      return SubMenuDef.language;
    } else {
      return SubMenuDef.user;
    }
  }

  getMinHeight(): string {
    const offset = 20;
    return Util.isPhoneOrTablet() ? (window.innerHeight + offset) + 'px' : '';
  }

  getMaxHeight(): string {
    const navbarHeight = 50;
    const offset = 20;
    return Util.isPhoneOrTablet() ? (window.innerHeight - navbarHeight + offset) + 'px' : '';
  }

  getOverflowY(): string {
    return Util.isPhoneOrTablet() ? 'scroll' : 'none';
  }

  getTransition(): string {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH ? 'all 0.5s ease-in-out 0s' : '';
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.authenticated = isAuthenticated;
    this.changeDetectorRef.detectChanges();
  }

  setSideMenuState(newState: number): void {
    if (newState === MenuState.collapsed) {
      this.collapseSubMenus();
    }
    this.sideMenuState = newState;
  }

  toggleSideMenuState(): void {
    if (this.sideMenuState === MenuState.expanded) {
      this.collapseSubMenus();
      this.sideMenuState = MenuState.collapsed;
    } else {
      this.sideMenuState = MenuState.expanded;
    }
  }

  onSubMenuExpanded(type: string): void {
    this.submenus.forEach((submenu) => {
      if (submenu.menuData.type !== type) {
        submenu.subMenuState = MenuState.collapsed;
      }
    });
  }

  displayIcon(): boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  displayLogout(): boolean {
    return this.authenticated && window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  private collapseSubMenus(): void {
    this.submenus.forEach((submenu) => {
      submenu.subMenuState = MenuState.collapsed;
    });
  }
}
