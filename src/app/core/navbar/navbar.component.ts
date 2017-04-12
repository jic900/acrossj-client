import { Component, HostListener, QueryList, ViewChildren, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { AppConfig } from 'app/config/app.config';
import { AppConstant } from 'app/config/app.config';
import { SubmenuComponent } from "app/core/navbar/submenu.component";
import { MenuState } from "app/config/menu.config"
import { SubMenuType } from "app/config/menu.config"

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements AfterViewInit {

  @ViewChildren(SubmenuComponent) submenus :QueryList<SubmenuComponent>;
  userSubMenu : SubmenuComponent;
  langSubMenu : SubmenuComponent;
  homeLogo : string;
  menuState : number;
  authenticated : boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.homeLogo = AppConfig.HOME_LOGO;
    this.menuState = MenuState.collapsed;
    this.authenticated = true;
  }

  ngAfterViewInit(): void {
    this.userSubMenu = this.submenus.find(submenu => submenu.linkName === 'Username');
    this.langSubMenu = this.submenus.find(submenu => submenu.linkName === 'Language');
    this.toggleTransition(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.menuState = MenuState.collapsed;
    this.userSubMenu.subMenuState = MenuState.collapsed;
    this.langSubMenu.subMenuState = MenuState.collapsed;
    this.toggleTransition(event.target.innerWidth);
  }

  isMenuExpanded() {
    return this.menuState === MenuState.expanded;
  }

  getUserSubMenuType() {
    return SubMenuType.user;
  }

  getLanguageSubMenuType() {
    SubMenuType.language;
  }

  toggleMenuState() {
    if (this.menuState === MenuState.expanded) {
      if (this.userSubMenu !== undefined) {
        this.userSubMenu.subMenuState = MenuState.collapsed;
      }
      this.langSubMenu.subMenuState = MenuState.collapsed;
    }
    this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
  }

  onToggled(type : string) {
    if (type === SubMenuType.user) {
      this.langSubMenu.subMenuState = 1;
    } else if (type === SubMenuType.language) {
      this.userSubMenu.subMenuState = 1;
    }
  }

  toggleTransition(width : number) {
    if (width > AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'no-transition');
    } else {
      this.renderer.removeClass(this.el.nativeElement.firstChild, 'no-transition');
    }
  }
}
