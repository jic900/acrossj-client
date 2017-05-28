import {
  Component,
  ViewChildren,
  QueryList,
  ChangeDetectorRef, ViewChild
} from '@angular/core';

import { SubMenuComponent } from './submenu/submenu.component';
import { AppConstant, MenuState, SideMenuDef, SubMenuDef } from 'app/config/app.config';
import { Util } from 'app/shared/util/util';
import { IMenuItem } from 'app/shared/interfaces/menuitem.interface';
import { SearchfieldComponent } from '../search/searchfield/searchfield.component';

@Component({
  selector: 'aj-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})

export class SideMenuComponent {

  @ViewChildren(SubMenuComponent) submenus: QueryList<SubMenuComponent>;
  @ViewChild(SearchfieldComponent) searchfield: SearchfieldComponent;
  sideMenuData: IMenuItem;
  sideMenuState: number;
  authenticated: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.sideMenuData = SideMenuDef.topList;
    this.sideMenuState = MenuState.collapsed;
    this.authenticated = false;
  }

  onSearchClicked(event): void {
    this.searchfield.onSearchClicked(event);
  }

  isSideMenuExpanded(): boolean {
    return this.sideMenuState === MenuState.expanded;
  }

  subMenuData(type: string) {
    if (type === 'language') {
      return SubMenuDef.language;
    } else if (type === 'auth') {
      return SubMenuDef.auth;
    }
    return SubMenuDef.user;
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
    return this.isDeviceWidth() ? 'all 0.5s ease-in-out 0s' : '';
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

  onSubMenuToggled(event): void {
    this.submenus.forEach((submenu) => {
      if (submenu.menuData.type !== event.type) {
        submenu.onOtherSubMenuToggled(event.expanded);
      }
    });
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }

  private collapseSubMenus(): void {
    this.submenus.forEach((submenu) => {
      submenu.subMenuState = MenuState.collapsed;
    });
  }
}
