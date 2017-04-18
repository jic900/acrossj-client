import {
  Component,
  AfterViewInit,
  ViewChildren,
  ElementRef,
  Renderer2,
  HostListener,
  QueryList
} from '@angular/core';
import { AppConfig, AppConstant } from 'app/config/app.config';
import { MenuState, SearchState, SubMenuType } from "app/config/menu.config"
import { SubmenuComponent } from "app/core/navbar/submenu.component";


@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChildren(SubmenuComponent) submenus: QueryList<SubmenuComponent>;
  userSubMenu: SubmenuComponent;
  langSubMenu: SubmenuComponent;
  homeLogo: string;
  menuState: number;
  searchState: number;
  windowWidth: number;
  authenticated: boolean;


  constructor(private el: ElementRef, private renderer: Renderer2) {
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
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    let newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      this.menuState = MenuState.collapsed;
      this.searchState = SearchState.collapsed;
      this.toggleTransition(newWindowWidth);
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

  toggleMenuState(): void {
    if (this.menuState === MenuState.expanded) {
      if (this.userSubMenu !== undefined) {
        this.userSubMenu.subMenuState = MenuState.collapsed;
      }
      this.langSubMenu.subMenuState = MenuState.collapsed;
    } else {
      this.searchState = SearchState.collapsed;
    }
    this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
  }

  toggleSearchState(): void {
    if (this.menuState === MenuState.expanded) {
      if (this.userSubMenu !== undefined) {
        this.userSubMenu.subMenuState = MenuState.collapsed;
      }
      this.langSubMenu.subMenuState = MenuState.collapsed;
      this.menuState = MenuState.collapsed;
    }
    this.searchState = this.searchState === SearchState.collapsed ? SearchState.expanded : SearchState.collapsed;
  }

  displayIcon() : boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  displayLogout(): boolean {
    return this.authenticated && window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  onToggled(type : string): void {
    if (type === SubMenuType.user) {
      this.langSubMenu.subMenuState = 1;
    } else if (type === SubMenuType.language) {
      this.userSubMenu.subMenuState = 1;
    }
  }

  private toggleTransition(width : number): void {
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'no-transition');
    } else {
      this.renderer.removeClass(this.el.nativeElement.firstChild, 'no-transition');
    }
  }
}
