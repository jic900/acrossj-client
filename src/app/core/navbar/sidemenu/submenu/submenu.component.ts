import {
  Component,
  Renderer2,
  Input,
  ElementRef,
  HostListener, Output, EventEmitter, ViewChild
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AppConstant, MenuState } from 'app/config/app.config';
import { IMenuItem } from 'app/shared/interfaces/menuitem.interface';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  // host: {
  //   '(document:mouseup)': 'onMouseUp($event)'
  // }
})

export class SubMenuComponent {

  @Input() menuData: IMenuItem;
  @Output() subMenuExpanded: EventEmitter<string>;
  @ViewChild('submenu') submenu: ElementRef;
  subMenuState: number;
  windowWidth: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private translate: TranslateService) {
    this.subMenuState = MenuState.collapsed;
    this.subMenuExpanded = new EventEmitter<string>();
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      this.subMenuState = MenuState.collapsed;
    }
  }

  isSubMenuPreCollapsed(): boolean {
    return this.subMenuState === MenuState.pre_collapsed;
  }

  isSubMenuPreExpanded(): boolean {
    return this.subMenuState === MenuState.pre_expanded;
  }

  isSubMenuExpanded(): boolean {
    return this.subMenuState === MenuState.expanded;
  }

  collapseSubMenu() {
    if (this.isSubMenuExpanded()) {
      this.subMenuState = MenuState.pre_collapsed;
      const self = this;
      setTimeout(function() {
        self.subMenuState = MenuState.collapsed;
      }, 500);
    }
  }

  expandSubMenu() {
    if (! this.isSubMenuExpanded()) {
      this.subMenuState = MenuState.pre_expanded;
      const self = this;
      setTimeout(function() {
        self.subMenuState = MenuState.expanded;
      }, 100);
    }
  }

  onClick(event): void {
    if (this.subMenuState === MenuState.collapsed) {
      this.subMenuExpanded.emit(this.menuData.type);
      const self = this;
      setTimeout(function() {
        self.subMenuState = MenuState.expanded;
      }, 200);
    } else {
      this.subMenuState = MenuState.collapsed;
    }
    // if (this.subMenuState === MenuState.collapsed) {
    //   this.subMenuExpanded.emit(this.menuData.type);
    //   this.expandSubMenu();
    // } else {
    //   this.collapseSubMenu();
    // }
  }

  onSubMenuClick(type: string): void {
    if (this.menuData.type === 'language') {
      const curLang = this.translate.currentLang;
      if (type !== curLang) {
        this.translate.use(type);
      }
      this.subMenuState = MenuState.collapsed;
    }
  }

  onMouseEnter(event): void {
    if (! this.isDeviceWidth()) {
      this.expandSubMenu();
    }
  }

  onMouseLeave(event): void {
    if (! this.isDeviceWidth()) {
      this.collapseSubMenu();
    }
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }
  showLogout(): boolean {
    return this.menuData.type === 'user' && ! this.isDeviceWidth();
  }
}
