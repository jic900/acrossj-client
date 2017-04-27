import {
  Component,
  OnInit,
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

export class SubmenuComponent implements OnInit, DoCheck, OnChanges, AfterViewInit {

  // @ViewChild('submenu') submenu: any;
  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('icon') icon: ElementRef;
  @Input() type: string;
  @Output() onSubMenuToggled: EventEmitter<string>;
  linkName: string;
  items: string[];
  subMenuState: number;
  windowWidth: number;
  lastCollapsedTime: number;
  cancelMouseMoveListenFunc: Function;
  cancelMouseLeaveListenFunc: Function;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.subMenuState = MenuState.collapsed;
    this.onSubMenuToggled = new EventEmitter<string>();
    this.lastCollapsedTime = 0;
  }

  ngOnInit() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    parentElement.removeChild(nativeElement);
  }

  ngDoCheck(): void {
    this.setMarginBottom();
  }

  ngAfterViewInit(): void {
    this.windowWidth = window.innerWidth;
    this.setMarginBottom();
    this.setIcon();
    this.toggleMouseEventListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.linkName = this.type === SubMenuType.user ? SubMenuDef.userMenu.linkName : SubMenuDef.languageMenu.linkName;
    this.items = this.type === SubMenuType.user ? SubMenuDef.userMenu.items : SubMenuDef.languageMenu.items;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      this.subMenuState = MenuState.collapsed;
      this.setIcon();
      this.toggleMouseEventListeners();
    }
  }

  isSubMenuExpanded(): boolean {
    return this.subMenuState === MenuState.expanded;
  }

  onMouseClick(event): void {
    // const width = window.innerWidth;
    // console.log('onMouseClick: ' + event.x + ' ' + event.y);
    if (!AppConfig.MENU_HOVER_MODE || this.windowWidth < AppConstant.DEFAULT_DEVICE_WIDTH || this.isIPAD()) {
      const curTime = new Date().getTime();
      if (this.subMenuState !== MenuState.collapsed || curTime - this.lastCollapsedTime > 100) {
        this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
        // this.setMarginBottomStyle();
        if (this.subMenuState === MenuState.expanded) {
          this.onSubMenuToggled.emit(this.type);
        }
      }
    }
  }

  onMouseMove(event): void {
    // console.log('onMouseMove: ' + event.x + ' ' + event.y);
    // const width = window.innerWidth;
    if (this.windowWidth >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      const mouseX = event.clientX, mouseY = event.clientY;
      if (mouseX === undefined || mouseY === undefined) {
        return;
      }
      if (this.subMenuState === MenuState.collapsed) {
        if (this.insideDropDown(mouseX, mouseY)) {
          this.onSubMenuToggled.emit(this.type);
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
    // const width = window.innerWidth;
    if (this.windowWidth >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      this.subMenuState = MenuState.collapsed;
    }
  }

  onMouseUp(event): void {
    // const width = window.innerWidth;
    if (this.windowWidth >= AppConstant.DEFAULT_DEVICE_WIDTH) {
      if (this.subMenuState === MenuState.expanded) {
        this.subMenuState = MenuState.collapsed;
        this.lastCollapsedTime = new Date().getTime();
      }
    }
  }

  displayIcon(): boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  displayLogout(): boolean {
    return this.type === SubMenuType.user && window.innerWidth >= AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  private isIPAD() {
    // let width = window.innerWidth;
    return this.windowWidth === AppConstant.IPAD_WIDTH || this.windowWidth === AppConstant.IPAD_PRO_WIDTH;
  }

  private setMarginBottom(): void {
    if (this.dropdown !== undefined && this.dropdown.nativeElement !== undefined) {
      const marginBottom = this.subMenuState === MenuState.expanded ? this.items.length * 30 + 'px' : '';
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
    const rect = this.dropdown.nativeElement.getBoundingClientRect();
    const left = rect.left, top = rect.top, width = rect.width, height = rect.height;
    // console.log(
    //   `insideDropDown(${this.type}) - (${mouseX}, ${mouseY})  X(${left}, ${left+width}) Y(${top}, ${top+height})`);
    return mouseX > left + 3 && mouseX < left + width - 3 && mouseY >= top && mouseY < top + height;
  }

  private insideDropDownMenu(mouseX, mouseY): boolean {
    const dropDownMenuElement = this.dropdown.nativeElement.querySelector('.dropdown-menu');
    const rect = dropDownMenuElement.getBoundingClientRect();
    const left = rect.left, top = rect.top, width = rect.width, height = rect.height;
    // console.log(
    //   `insideDropDownMenu(${this.type}) - (${mouseX}, ${mouseY})  X(${left}, ${left+width}) Y(${top}, ${top+height})`);
    return mouseX > left + 3 && mouseX < left + width - 3 && mouseY >= top && mouseY < top + height - 1;
  }

  private toggleMouseEventListeners(): void {
    if (AppConfig.MENU_HOVER_MODE === true) {
      if (this.windowWidth > AppConstant.DEFAULT_DEVICE_WIDTH) {
        if (this.cancelMouseMoveListenFunc === undefined) {
          this.cancelMouseMoveListenFunc = this.renderer.listen(this.dropdown.nativeElement, 'mousemove', (event) => {
            this.onMouseMove(event);
          });
        }
        if (this.cancelMouseLeaveListenFunc === undefined) {
          this.cancelMouseLeaveListenFunc = this.renderer.listen(this.dropdown.nativeElement, 'mouseleave', (event) => {
            this.onMouseLeave(event);
          });
        }
      } else {
        if (this.cancelMouseMoveListenFunc !== undefined) {
          this.cancelMouseMoveListenFunc();
          this.cancelMouseMoveListenFunc = undefined;
        }
        if (this.cancelMouseLeaveListenFunc !== undefined) {
          this.cancelMouseLeaveListenFunc();
          this.cancelMouseLeaveListenFunc = undefined;
        }
      }
    }
  }
}
