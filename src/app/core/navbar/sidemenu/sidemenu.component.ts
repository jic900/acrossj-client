import {
  Component,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ChangeDetectorRef, ElementRef, Renderer2
} from '@angular/core';

import { SubMenuComponent } from './submenu/submenu.component';
import { MenuState, SubMenuDef, SubMenuType } from 'app/config/menu.config';
import { AppConstant } from 'app/config/app.config';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})

export class SideMenuComponent implements AfterViewInit {

  @ViewChildren(SubMenuComponent) submenus: QueryList<SubMenuComponent>;
  userSubMenu: SubMenuComponent;
  langSubMenu: SubMenuComponent;
  sideMenuState: number;
  authenticated: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    this.sideMenuState = MenuState.collapsed;
    this.authenticated = false;
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.userSubMenu = this.submenus.find(submenu => submenu.linkName === SubMenuDef.userMenu.linkName);
      this.langSubMenu = this.submenus.find(submenu => submenu.linkName === SubMenuDef.languageMenu.linkName);
    });
  }

  isSideMenuExpanded(): boolean {
    return this.sideMenuState === MenuState.expanded;
  }

  getUserSubMenuType(): string {
    return SubMenuType.user;
  }

  getLanguageSubMenuType(): string {
    return SubMenuType.language;
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
    return Util.isPhoneOrTablet() ? 'scroll !important' : 'none';
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

  onSubMenuToggled(type: string): void {
    if (type === SubMenuType.user) {
      this.langSubMenu.subMenuState = MenuState.collapsed;
    } else if (type === SubMenuType.language) {
      this.userSubMenu.subMenuState = MenuState.collapsed;
    }
  }

  displayIcon(): boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  displayLogout(): boolean {
    return this.authenticated && window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  private collapseSubMenus(): void {
    if (this.userSubMenu !== undefined) {
      this.userSubMenu.setSubMenuState(MenuState.collapsed);
    }
    this.langSubMenu.setSubMenuState(MenuState.collapsed);
  }
}
