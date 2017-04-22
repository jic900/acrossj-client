import {
  Component,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  Renderer2,
  HostListener,
  QueryList,
  ViewChild
} from '@angular/core';
import { AppConfig, AppConstant } from 'app/config/app.config';
import { MenuState, SearchState, SubMenuType } from 'app/config/menu.config';
import { SubmenuComponent } from 'app/core/navbar/submenu.component';
import { Util } from 'app/shared/util/util';
import { SearchmenuComponent } from './searchmenu.component';


@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChild('navbarCollapse') navbarCollapse: ElementRef;
  // @ViewChild('navbarSearch') navbarSearch: ElementRef;
  @ViewChild(SearchmenuComponent) navbarSearch: SearchmenuComponent;
  @ViewChildren(SubmenuComponent) submenus: QueryList<SubmenuComponent>;
  userSubMenu: SubmenuComponent;
  langSubMenu: SubmenuComponent;
  homeLogo: string;
  menuState: number;
  // searchState: number;
  windowWidth: number;
  authenticated: boolean;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    this.homeLogo = AppConfig.HOME_LOGO;
    this.menuState = MenuState.collapsed;
    // this.searchState = SearchState.collapsed;
    this.authenticated = true;
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    this.userSubMenu = this.submenus.find(submenu => submenu.linkName === 'Username');
    this.langSubMenu = this.submenus.find(submenu => submenu.linkName === 'Language');
    this.toggleTransition(window.innerWidth);
    // this.toggleHomeContentScroll();
    this.configureMenus(this.windowWidth, window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      this.menuState = MenuState.collapsed;
      // this.searchState = SearchState.collapsed;
      this.navbarSearch.searchState = SearchState.collapsed;
      this.toggleTransition(this.windowWidth);
      this.configureMenus(this.windowWidth, event.target.innerHeight);
    }
  }

  isMenuExpanded(): boolean {
    return this.menuState === MenuState.expanded;
  }

  // isSearchExpanded(): boolean {
  //   return this.searchState === SearchState.expanded;
  // }

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
    // this.toggleHomeContentScroll();
  }

  onSearchClick(event): void {
    if (this.menuState === MenuState.expanded) {
      if (this.userSubMenu !== undefined) {
        this.userSubMenu.subMenuState = MenuState.collapsed;
      }
      this.langSubMenu.subMenuState = MenuState.collapsed;
      this.toggleMenuState();
    }
    // this.searchState = this.searchState === SearchState.collapsed ? SearchState.expanded : SearchState.collapsed;
    this.navbarSearch.onSearchClick();
    // this.toggleHomeContentScroll();
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
    const navbarSearchPaddingVertical = 60;
    const navbarSearchPanel = this.navbarSearch.navbarSearchPanel.nativeElement;

    // set two menus full screen on phone or tablet, and scrollable
    if (Util.isPhoneOrTablet()) {
      // left main menu
      this.renderer.setStyle(this.navbarCollapse.nativeElement, 'min-height', (windowHeight + offset) + 'px');
      const navbarCollapseList = this.navbarCollapse.nativeElement.firstElementChild;
      this.renderer.setStyle(navbarCollapseList, 'max-height', (windowHeight - navbarHeight + offset) + 'px');
      this.renderer.setStyle(navbarCollapseList, 'overflow-y', 'scroll !important');
      // right search menu
      this.renderer.setStyle(navbarSearchPanel, 'min-height', (windowHeight + offset) + 'px');
      const navbarSearchPanelMaxHeight = windowHeight - navbarHeight - navbarSearchPaddingVertical;
      this.renderer.setStyle(navbarSearchPanel, 'max-height', navbarSearchPanelMaxHeight + 'px');
      this.renderer.setStyle(navbarSearchPanel, 'overflow-y', 'scroll !important');
    }

    // set search menu fields responsive based on window width
    if (windowWidth > AppConstant.IPHONE6__WIDTH) {
      const widthPercent = 100 - (windowWidth - AppConstant.IPHONE6__WIDTH) * 100 / (windowWidth * 1.5);
      this.renderer.setStyle(navbarSearchPanel.firstElementChild, 'width', widthPercent + '%');
    } else {
      this.renderer.setStyle(navbarSearchPanel.firstElementChild, 'width', '88%');
    }
  }

  private toggleTransition(width: number): void {
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'no-transition');
    } else {
      this.renderer.removeClass(this.el.nativeElement.firstChild, 'no-transition');
    }
  }

  private toggleMenuState(): void {
    this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    // this.toggleBodyScroll();
  }

  // private toggleHomeContentScroll() {
  //   if (Util.isPhoneOrTablet()) {
  //     const homeContentElement = document.querySelector('.home-content');
  //     if (this.menuState === MenuState.collapsed && this.searchState === MenuState.collapsed) {
  //       // this.renderer.setStyle(homeContentElement, '-webkit-overflow-scrolling', 'touch');
  //       // this.renderer.removeStyle(homeContentElement, 'position');
  //       // this.renderer.removeStyle(homeContentElement, 'top');
  //       this.renderer.removeStyle(homeContentElement, 'overflow');
  //     } else {
  //       // this.renderer.setStyle(homeContentElement, 'position', 'fixed');
  //       // console.log('pageYOffset: ' + window.pageYOffset);
  //       // this.renderer.setStyle(homeContentElement, 'top', -window.pageYOffset + 'px');
  //       this.renderer.setStyle(homeContentElement, 'overflow', 'auto');
  //       // this.renderer.removeStyle(homeContentElement, '-webkit-overflow-scrolling');
  //     }
  //   }
  // }

  // private toggleBodyScroll(): void {
  //   const bodyElement = document.querySelector('body');
  //   if (this.menuState === MenuState.expanded) {
  //     this.renderer.addClass(bodyElement, 'no-scroll');
  //   } else {
  //     this.renderer.removeClass(bodyElement, 'no-scroll');
  //   }
  // }
}
