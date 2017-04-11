import { Component, HostListener, QueryList, ViewChildren, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { AppConfig } from 'app/config/app.config';
import { SubmenuComponent } from "app/core/navbar/submenu.component";
import { MenuState } from "./MenuState";


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
  width : number;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.homeLogo = AppConfig.HOME_LOGO;
    this.menuState = MenuState.collapsed;
    this.authenticated = true;
    this.width = window.innerWidth;
  }

  ngAfterViewInit(): void {
    this.userSubMenu = this.submenus.find(function(submenu) {
      return submenu.linkName === 'Username';
    });
    this.langSubMenu = this.submenus.find(function(submenu) {
      return submenu.linkName === 'Language';
    });
    this.toggleTransition();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.menuState = MenuState.collapsed;
    this.userSubMenu.subMenuState = MenuState.collapsed;
    this.langSubMenu.subMenuState = MenuState.collapsed;
    this.width = event.target.innerWidth;
    this.toggleTransition();
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

  toggleTransition() {
    if (this.width > 768) {
      this.renderer.addClass(this.el.nativeElement.firstChild, 'no-transition');
    } else {
      this.renderer.removeClass(this.el.nativeElement.firstChild, 'no-transition');
    }
  }

  isMenuExpanded() {
    return this.menuState === MenuState.expanded;
  }
}
