import { Component, ElementRef, Input, Output, EventEmitter,
        ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { AppConstant } from 'app/config/app.config';
import { SubMenuDef } from 'app/config/menu.config';
import { SubMenuType } from "app/config/menu.config"
import { MenuState } from 'app/config/menu.config';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  host: {
    '(document:mouseup)': 'onMouseUp($event)'
  }
})

export class SubmenuComponent implements OnChanges {

  @ViewChild('submenu') submenu: any;
  @Input() type: string;
  @Output() onToggled : EventEmitter<string>;
  linkName: string;
  items: string[];
  subMenuState : number;
  lastCollapsedTime : number;

  constructor() {
    this.subMenuState = MenuState.collapsed;
    this.onToggled = new EventEmitter<string>();
    this.lastCollapsedTime = 0;
  }

  // ngOnInit() {
  //   var nativeElement: HTMLElement = this.el.nativeElement,
  //     parentElement: HTMLElement = nativeElement.parentElement;
  //   while (nativeElement.firstChild) {
  //     parentElement.insertBefore(nativeElement.firstChild, nativeElement);
  //   }
  //   parentElement.removeChild(nativeElement);
  // }

  ngOnChanges(changes: SimpleChanges): void {
    this.linkName = this.type === SubMenuType.user ? SubMenuDef.userMenu.linkName : SubMenuDef.languageMenu.linkName;
    this.items = this.type === SubMenuType.user ? SubMenuDef.userMenu.items : SubMenuDef.languageMenu.items;
  }

  onMouseClick() {
    let curTime = new Date().getTime();
    if (this.subMenuState !== MenuState.collapsed || curTime - this.lastCollapsedTime > 50) {
      this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
      if (this.subMenuState === MenuState.expanded) {
        this.onToggled.emit(this.type);
      }
    }
  }

  onMouseEnter(event) {
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.subMenuState = MenuState.expanded;
    }
  }

  onMouseLeave(event) {
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.subMenuState = MenuState.collapsed;
    }
  }

  onMouseUp(event) {
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      if (this.subMenuState === MenuState.expanded) {
        this.subMenuState = MenuState.collapsed;
        this.lastCollapsedTime = new Date().getTime();
      }
    }
  }

  isSubMenuExpanded() {
    return this.subMenuState === MenuState.expanded;
  }

  getMarginBottomOffset() {
    return this.subMenuState === MenuState.expanded ? this.items.length * 2 + 'em' : '';
  }
}
