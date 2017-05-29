import {
  Component,
  ViewChildren,
  QueryList,
  ChangeDetectorRef, ViewChild, Input
} from '@angular/core';

import { SubMenuComponent } from './submenu/submenu.component';
import { SearchfieldComponent } from '../search/searchfield/searchfield.component';
import { AppConstant, MenuState } from 'app/config/app.config';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})

export class SideMenuComponent {

  @ViewChildren(SubMenuComponent) submenus: QueryList<SubMenuComponent>;
  @ViewChild(SearchfieldComponent) searchfield: SearchfieldComponent;
  @Input() sideMenuData: {};
  sideMenuState: number;
  authenticated: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.sideMenuState = MenuState.collapsed;
    this.authenticated = false;
  }

  onSearchClicked(event): void {
    this.searchfield.onSearchClicked(event);
  }

  isSideMenuExpanded(): boolean {
    return this.sideMenuState === MenuState.expanded;
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
