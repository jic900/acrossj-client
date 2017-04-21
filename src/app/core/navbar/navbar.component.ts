import {
  Component,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  Renderer2,
  HostListener,
  QueryList, ViewChild
} from '@angular/core';
import { AppConfig, AppConstant } from 'app/config/app.config';
import { MenuState, SearchState, SubMenuType } from 'app/config/menu.config';
import { SubmenuComponent } from 'app/core/navbar/submenu.component';
import { Util } from 'app/shared/util/util';


@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChild('navbarCollapse') navbarCollapse: ElementRef;
  @ViewChild('navbarSearch') navbarSearch: ElementRef;
  @ViewChildren(SubmenuComponent) submenus: QueryList<SubmenuComponent>;
  userSubMenu: SubmenuComponent;
  langSubMenu: SubmenuComponent;
  homeLogo: string;
  menuState: number;
  searchState: number;
  windowWidth: number;
  authenticated: boolean;

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
    this.homeLogo = AppConfig.HOME_LOGO;
    this.menuState = MenuState.collapsed;
    this.searchState = SearchState.collapsed;
    this.authenticated = true;
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    this.userSubMenu = this.submenus.find(submenu => submenu.linkName === 'Username');
    this.langSubMenu = this.submenus.find(submenu => submenu.linkName === 'Language');
    this.toggleTransition(window.innerWidth);
    this.configureMenuSize(this.windowWidth, window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      this.menuState = MenuState.collapsed;
      this.searchState = SearchState.collapsed;
      this.toggleTransition(newWindowWidth);
      this.configureMenuSize(this.windowWidth, event.target.innerHeight);
    }
  }

  isMenuExpanded(): boolean {
    return this.menuState === MenuState.expanded;
  }

  isSearchExpanded(): boolean {
    return this.searchState === SearchState.expanded;
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
      this.searchState = SearchState.collapsed;
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
    this.searchState = this.searchState === SearchState.collapsed ? SearchState.expanded : SearchState.collapsed;
  }

  displayIcon(): boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  displayLogout(): boolean {
    return this.authenticated && window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  onToggled(type: string): void {
    if (type === SubMenuType.user) {
      this.langSubMenu.subMenuState = MenuState.collapsed;
    } else if (type === SubMenuType.language) {
      this.userSubMenu.subMenuState = MenuState.collapsed;
    }
  }

  private configureMenuSize(windowWidth, windowHeight) {
    const navbarHeight = 50;
    const navbarSearchPaddingVertical = 60;
    if (Util.isPhoneOrTablet()) {
      this.renderer.setStyle(this.navbarCollapse.nativeElement, 'min-height', (windowHeight - navbarHeight) + 'px');
      this.renderer.setStyle(this.navbarCollapse.nativeElement.firstElementChild, 'max-height', (windowHeight - navbarHeight) + 'px');
    }
    this.renderer.setStyle(
      this.navbarSearch.nativeElement, 'max-height', (windowHeight - navbarHeight - navbarSearchPaddingVertical) + 'px');
    if (windowWidth > AppConstant.IPHONE6__WIDTH) {
      const widthPercent = 100 - (windowWidth - AppConstant.IPHONE6__WIDTH) * 100 / (windowWidth * 1.5);
      this.renderer.setStyle(this.navbarSearch.nativeElement.firstElementChild, 'width', widthPercent + '%');
    } else {
      this.renderer.setStyle(this.navbarSearch.nativeElement.firstElementChild, 'width', '88%');
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

  // private toggleBodyScroll(): void {
  //   const bodyElement = document.querySelector('body');
  //   if (this.menuState === MenuState.expanded) {
  //     this.renderer.addClass(bodyElement, 'no-scroll');
  //   } else {
  //     this.renderer.removeClass(bodyElement, 'no-scroll');
  //   }
  // }
}
