import {
  Component,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  Renderer2,
  HostListener,
  QueryList,
  ViewChild,
  RendererStyleFlags2
} from '@angular/core';

import { SubmenuComponent } from './submenu.component';
import { SearchmenuComponent } from './searchmenu.component';
import { AppConfig, AppConstant } from 'app/config/app.config';
import { MenuState, SearchState, SubMenuType } from 'app/config/menu.config';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChild('navbarCollapse') navbarCollapse: ElementRef;
  @ViewChild(SearchmenuComponent) navbarSearch: SearchmenuComponent;
  @ViewChildren(SubmenuComponent) submenus: QueryList<SubmenuComponent>;
  userSubMenu: SubmenuComponent;
  langSubMenu: SubmenuComponent;
  homeLogo: string;
  menuState: number;
  windowWidth: number;
  authenticated: boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.homeLogo = AppConfig.HOME_LOGO;
    this.menuState = MenuState.collapsed;
    this.authenticated = true;
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    this.userSubMenu = this.submenus.find(submenu => submenu.linkName === 'Username');
    this.langSubMenu = this.submenus.find(submenu => submenu.linkName === 'Language');
    this.toggleTransition(window.innerWidth);
    this.configureMenus(this.windowWidth, window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      if (this.windowWidth >= AppConstant.DEFAULT_DEVICE_WIDTH) {
        this.menuState = MenuState.collapsed;
        this.navbarSearch.searchState = SearchState.collapsed;
      }
      this.toggleTransition(this.windowWidth);
      this.configureMenus(this.windowWidth, event.target.innerHeight);
    }
  }

  isMenuExpanded(): boolean {
    return this.menuState === MenuState.expanded;
  }

  getUserSubMenuType(): string {
    return SubMenuType.user;
  }

  getLanguageSubMenuType(): string {
    return SubMenuType.language;
  }

  onMenuClick(event): void {
    if (this.menuState === MenuState.expanded) {
      if (this.userSubMenu !== undefined) {
        this.userSubMenu.subMenuState = MenuState.collapsed;
      }
      this.langSubMenu.subMenuState = MenuState.collapsed;
    } else {
      this.navbarSearch.searchState = SearchState.collapsed;
    }
    this.toggleMenuState();
  }

  onSearchClick(event): void {
    if (this.menuState === MenuState.expanded) {
      if (this.userSubMenu !== undefined) {
        this.userSubMenu.subMenuState = MenuState.collapsed;
      }
      this.langSubMenu.subMenuState = MenuState.collapsed;
      this.toggleMenuState();
    }
    this.navbarSearch.onSearchClick();
  }

  displayIcon(): boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  displayLogout(): boolean {
    return this.authenticated && window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  onSubMenuToggled(type: string): void {
    if (type === SubMenuType.user) {
      this.langSubMenu.subMenuState = MenuState.collapsed;
    } else if (type === SubMenuType.language) {
      this.userSubMenu.subMenuState = MenuState.collapsed;
    }
  }

  private configureMenus(windowWidth, windowHeight) {
    const navbarHeight = 50;
    const offset = 20;
    const navbarSearchPaddingVertical = 30;
    const navbarSearchDiv = this.navbarSearch.elementRef.nativeElement.firstElementChild;
    const navbarSearchPanelDiv = navbarSearchDiv.firstElementChild;

    // set two menus full screen on phone or tablet, and scrollable
    if (Util.isPhoneOrTablet()) {
      // left main menu
      this.renderer.setStyle(this.navbarCollapse.nativeElement, 'min-height', (windowHeight + offset) + 'px');
      const navbarCollapseList = this.navbarCollapse.nativeElement.firstElementChild;
      this.renderer.setStyle(navbarCollapseList, 'max-height', (windowHeight - navbarHeight + offset) + 'px');
      this.renderer.setStyle(navbarCollapseList, 'overflow-y', 'scroll', RendererStyleFlags2.Important);
      // right search menu
      const navbarSearchElement = this.navbarSearch.elementRef.nativeElement.firstElementChild;
      this.renderer.setStyle(navbarSearchElement, 'min-height', (windowHeight + offset) + 'px');
      const navbarSearchPanelMaxHeight = windowHeight - navbarHeight - navbarSearchPaddingVertical;
      this.renderer.setStyle(navbarSearchPanelDiv, 'max-height', navbarSearchPanelMaxHeight + 'px');
      this.renderer.setStyle(navbarSearchPanelDiv, 'overflow-y', 'scroll', RendererStyleFlags2.Important);
    }

    // set search menu fields responsive based on window width
    if (windowWidth > AppConstant.IPHONE6__WIDTH) {
      const widthPercent = 100 - (windowWidth - AppConstant.IPHONE6__WIDTH) * 100 / (windowWidth * 1.5);
      this.renderer.setStyle(navbarSearchPanelDiv.firstElementChild, 'width', widthPercent + '%');
    } else {
      this.renderer.setStyle(navbarSearchPanelDiv.firstElementChild, 'width', '88%');
    }
    this.navbarSearch.updateDateRangePickerOnWindowResize();
  }

  private toggleTransition(width: number): void {
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.renderer.addClass(this.elementRef.nativeElement.firstChild, 'no-transition');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement.firstChild, 'no-transition');
    }
  }

  private toggleMenuState(): void {
    this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
  }
}
