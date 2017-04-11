import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MenuState } from './MenuState';
import { SubMenuDef } from 'app/config/app.config';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./navbar.component.css']
})

export class SubmenuComponent implements OnInit {

  @Input() type: string;
  linkName: string;
  items: string[];
  expandedStyle: string;
  subMenuState : number;

  constructor(private el: ElementRef) {
    // this.linkName = linkName;
    // this.items = itemList;
    this.subMenuState = MenuState.collapsed;
    console.log('linkName = ' + this.linkName);
  }

  ngOnInit() {
    var nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    parentElement.removeChild(nativeElement);

    this.linkName = this.type === 'user' ? SubMenuDef.userMenu.linkName : SubMenuDef.languageMenu.linkName;
    this.items = this.type === 'user' ? SubMenuDef.userMenu.items : SubMenuDef.languageMenu.items;
    this.expandedStyle = this.type === 'user' ? 'userSubMenuExpanded' : 'langSubMenuExpanded';
  }

  toggleSubMenuState() {
    this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    console.log('this.subMenuState === ' + this.subMenuState);
  }

  isSubMenuExpanded() {
    return this.subMenuState === MenuState.expanded;
  }

}
