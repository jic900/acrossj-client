import {
  Component,
  OnInit,
  DoCheck,
  AfterViewInit,
  Renderer2,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter,
  HostListener
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AppConfig, AppConstant, MenuState } from 'app/config/app.config';
import { IMenuItem } from 'app/shared/interfaces/menuitem.interface';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  host: {
    '(document:mouseup)': 'onMouseUp($event)'
  }
})

export class SubMenuComponent implements OnInit, DoCheck, AfterViewInit {

  @ViewChild('dropdown') dropdown: ElementRef;
  @Input() menuData: IMenuItem;
  @Output() onSubMenuExpanded: EventEmitter<string>;
  subMenuState: number;
  windowWidth: number;
  lastCollapsedTime: number;
  cancelMouseMoveListenFunc: Function;
  cancelMouseLeaveListenFunc: Function;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private translate: TranslateService) {
    this.subMenuState = MenuState.collapsed;
    this.onSubMenuExpanded = new EventEmitter<string>();
    this.lastCollapsedTime = 0;
  }

  ngOnInit() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
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
    this.configureMouseEventListeners();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const newWindowWidth = event.target.innerWidth;
    if (newWindowWidth !== this.windowWidth) {
      this.windowWidth = newWindowWidth;
      this.subMenuState = MenuState.collapsed;
      this.configureMouseEventListeners();
    }
  }

  isSubMenuExpanded(): boolean {
    return this.subMenuState === MenuState.expanded;
  }

  setSubMenuState(newState: number) {
    this.subMenuState = newState;
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
          this.onSubMenuExpanded.emit(this.menuData.type);
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
          this.onSubMenuExpanded.emit(this.menuData.type);
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

  onSubMenuClick(type: string): void {
    if (this.menuData.type === 'language') {
      const curLang = this.translate.currentLang;
      if (type !== curLang) {
        this.translate.use(type);
      }
      this.subMenuState = MenuState.collapsed;
    }
  }

  show(): boolean {
    return window.innerWidth < AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  showLogout(): boolean {
    return this.menuData.type === 'user' && window.innerWidth >= AppConstant.DEFAULT_DEVICE_WIDTH;
  }

  private isIPAD() {
    // let width = window.innerWidth;
    return this.windowWidth === AppConstant.IPAD_WIDTH || this.windowWidth === AppConstant.IPAD_PRO_WIDTH;
  }

  private setMarginBottom(): void {
    if (this.dropdown !== undefined && this.dropdown.nativeElement !== undefined) {
      const marginBottom = this.subMenuState === MenuState.expanded ? this.menuData.value.length * 30 + 'px' : '';
      this.renderer.setStyle(this.dropdown.nativeElement, 'margin-bottom', marginBottom);
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

  private configureMouseEventListeners(): void {
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
