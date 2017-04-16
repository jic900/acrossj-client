import {
  Component,
  DoCheck,
  AfterViewInit,
  OnChanges,
  Renderer2,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
  SimpleChanges,
  HostListener
} from '@angular/core';

import { AppConfig, AppConstant } from 'app/config/app.config';
import { SubMenuDef, SubMenuType, MenuState } from 'app/config/menu.config';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  host: {
    '(document:mouseup)': 'onMouseUp($event)'
  }
})

export class SubmenuComponent implements DoCheck, OnChanges, AfterViewInit {

  @ViewChild('submenu') submenu: any;
  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('icon') icon: ElementRef;
  @Input() type: string;
  @Output() onToggled : EventEmitter<string>;
  linkName: string;
  items: string[];
  subMenuState : number;
  lastCollapsedTime : number;

  constructor(private renderer: Renderer2) {
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

  ngDoCheck(): void {
    this.setMarginBottom();
  }

  ngAfterViewInit(): void {
    this.setMarginBottom();
    this.setIcon();
    if (AppConfig.MENU_HOVER_MODE === true) {
      this.renderer.listen(this.dropdown.nativeElement, 'mousemove', (event) => {
        this.onMouseMove(event);
      });
      this.renderer.listen(this.dropdown.nativeElement, 'mouseleave', (event) => {
        this.onMouseLeave(event);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.linkName = this.type === SubMenuType.user ? SubMenuDef.userMenu.linkName : SubMenuDef.languageMenu.linkName;
    this.items = this.type === SubMenuType.user ? SubMenuDef.userMenu.items : SubMenuDef.languageMenu.items;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    this.subMenuState = MenuState.collapsed;
    this.setIcon();
  }

  isSubMenuExpanded(): boolean {
    return this.subMenuState === MenuState.expanded;
  }

  onMouseClick(event): void {
    let width = window.innerWidth;
    if (!AppConfig.MENU_HOVER_MODE || width <= AppConstant.DEFAULT_DEVICE_WIDTH) {
      // console.log('onMouseClick: ' + event.x + ' ' + event.y);
      let curTime = new Date().getTime();
      if (this.subMenuState !== MenuState.collapsed || curTime - this.lastCollapsedTime > 100) {
        this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
        // this.setMarginBottomStyle();
        if (this.subMenuState === MenuState.expanded) {
          this.onToggled.emit(this.type);
        }
      }
    }
  }

  onMouseMove(event): void {
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      let mouseX = event.clientX, mouseY = event.clientY;
      if (mouseX === undefined || mouseY === undefined) {
        return;
      }
      if (this.subMenuState === MenuState.collapsed) {
        if (this.insideDropDown(mouseX, mouseY)) {
          this.onToggled.emit(this.type);
          this.subMenuState = MenuState.expanded;
        }
      } else {
        if (!this.insideDropDown(mouseX, mouseY) && !this.insideDropDownMenu(mouseX, mouseY)) {
          this.subMenuState = MenuState.collapsed;
        }
      }
    }
  }

  onMouseLeave(event): void {
    // let mouseX = event.clientX, mouseY = event.clientY;
    // console.log(`onMouseLeave - (${mouseX}, ${mouseY})`);
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.subMenuState = MenuState.collapsed;
    }
  }

  onMouseUp(event): void {
    let width = window.innerWidth;
    if (width >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      if (this.subMenuState === MenuState.expanded) {
        this.subMenuState = MenuState.collapsed;
        this.lastCollapsedTime = new Date().getTime();
      }
    }
  }

  displayIcon() : boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  displayLogout(): boolean {
    return this.type === SubMenuType.user && window.innerWidth >= AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  private setMarginBottom(): void {
    if (this.dropdown !== undefined && this.dropdown.nativeElement !== undefined) {
      let marginBottom = this.subMenuState === MenuState.expanded ? this.items.length * 30 + 'px' : '';
      this.renderer.setStyle(this.dropdown.nativeElement, 'margin-bottom', marginBottom);
    }
  }

  private setIcon(): void {
    if (this.icon !== undefined && this.icon.nativeElement !== undefined) {
      if (this.displayIcon()) {
        if (this.type === SubMenuType.user) {
          this.renderer.addClass(this.icon.nativeElement, 'fa-user');
        } else {
          this.renderer.addClass(this.icon.nativeElement, 'fa-language');
        }
      }
    }
  }

  private insideDropDown(mouseX, mouseY): boolean {
    let rect = this.dropdown.nativeElement.getBoundingClientRect();
    let left = rect.left, top = rect.top, width = rect.width, height = rect.height;
    // console.log(
    //   `insideDropDown(${this.type}) - (${mouseX}, ${mouseY})  X(${left}, ${left+width}) Y(${top}, ${top+height})`);
    return mouseX > left + 3 && mouseX < left + width - 3 && mouseY >= top && mouseY < top + height;
  }

  private insideDropDownMenu(mouseX, mouseY): boolean {
    let dropDownMenuElement = this.dropdown.nativeElement.querySelector('.dropdown-menu');
    let rect = dropDownMenuElement.getBoundingClientRect();
    let left = rect.left, top = rect.top, width = rect.width, height = rect.height;
    // console.log(
    //   `insideDropDownMenu(${this.type}) - (${mouseX}, ${mouseY})  X(${left}, ${left+width}) Y(${top}, ${top+height})`);
    return mouseX > left + 3 && mouseX < left + width - 3 && mouseY >= top && mouseY < top + height - 1;
  }
}
