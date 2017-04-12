import {Component, ElementRef, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { AppConstant } from 'app/config/app.config';
import { SubMenuDef } from 'app/config/menu.config';
import { SubMenuType } from "app/config/menu.config"
import { MenuState } from 'app/config/menu.config';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
})

export class SubmenuComponent implements OnInit {

  @Input() type: string;
  @Output() onToggled : EventEmitter<string>;
  linkName: string;
  items: string[];
  subMenuState : number;

  constructor(private el: ElementRef) {
    this.subMenuState = MenuState.collapsed;
    this.onToggled = new EventEmitter<string>();
  }

  ngOnInit() {
    var nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    parentElement.removeChild(nativeElement);

    this.linkName = this.type === SubMenuType.user ? SubMenuDef.userMenu.linkName : SubMenuDef.languageMenu.linkName;
    this.items = this.type === SubMenuType.user ? SubMenuDef.userMenu.items : SubMenuDef.languageMenu.items;
  }

  onMouseClick() {
    let width = window.innerWidth;
    if (width <= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
      if (this.subMenuState === MenuState.expanded) {
        this.onToggled.emit(this.type);
      }
    }
  }

  onMouseEnter() {
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.subMenuState = MenuState.expanded;
    }
  }

  onMouseLeave() {
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.subMenuState = MenuState.collapsed;
    }
  }

  isSubMenuExpanded() {
    return this.subMenuState === MenuState.expanded;
  }

  getMarginBottomOffset() {
    return this.subMenuState === MenuState.expanded ? this.items.length * 2 + 'em' : '';
  }
}
