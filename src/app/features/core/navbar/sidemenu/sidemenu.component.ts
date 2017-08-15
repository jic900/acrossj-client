import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  ViewChild,
  QueryList
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

import { SideMenuConfig } from 'app/config/core/sidemenu.config';
import { AppConstant } from 'app/config/common/app-constant.config';
import { MenuState } from 'app/config/common/menustate.config';
import { Util } from 'app/shared/util/util';
import { AuthService } from 'app/features/auth/services/auth.service';
import { IListElement } from 'app/config/interfaces/list-element.interface';
import { IMenuElement } from 'app/config/interfaces/menu-element.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';
import { SubMenuComponent } from './submenu/submenu.component';
import { SearchfieldComponent } from '../search/searchfield/searchfield.component';

interface ISideMenu {
  topList: IListElement;
  bottomMenu: IMenuElement;
}
interface IBottomMenuLinks {
  search: ILinkElement;
  signinSignup: ILinkElement;
  signout: ILinkElement;
}
interface IBottomMenuSubmenus {
  auth: IListElement;
  account: IListElement;
  language: IListElement;
}

@Component({
  selector: 'aj-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})

export class SideMenuComponent implements OnInit, OnDestroy {

  @ViewChildren(SubMenuComponent) submenus: QueryList<SubMenuComponent>;
  @ViewChild(SearchfieldComponent) searchfield: SearchfieldComponent;
  sideMenuData: ISideMenu;
  topListLinks: ILinkElement[];
  bottomMenuLinks: IBottomMenuLinks;
  bottomMenuSubmenus: IBottomMenuSubmenus;
  sideMenuState: number;
  authenticated: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) {
    this.sideMenuData = _.mapKeys(new SideMenuConfig().elements, 'name');
    this.topListLinks = <ILinkElement[]> this.sideMenuData.topList.list;
    this.bottomMenuLinks = _.mapKeys(this.sideMenuData.bottomMenu.links, 'name');
    this.bottomMenuSubmenus = _.mapKeys(this.sideMenuData.bottomMenu.submenus, 'name');
    this.sideMenuState = MenuState.collapsed;
    this.authenticated = authService.authenticated;
  }

  ngOnInit(): void {
    this.subscription = this.authService.authenticated$.subscribe(
      isAuthenticated => this.authenticated = isAuthenticated);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
    this.submenus.forEach(submenu => {
      if (submenu.menuData.name !== event.name) {
        submenu.onOtherSubMenuToggled(event.expanded);
      }
    });
  }

  onSubMenuClicked(event): void {
    this.setSideMenuState(MenuState.collapsed);
  }

  onSignOut() {
    this.setSideMenuState(MenuState.collapsed);
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }

  private collapseSubMenus(): void {
    this.submenus.forEach(submenu => {
      submenu.subMenuState = MenuState.collapsed;
    });
  }
}
