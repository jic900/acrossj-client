import {
  Component, ElementRef, Input, Output, EventEmitter,
  ViewChild, OnChanges, SimpleChanges, AfterViewInit, Renderer2
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

export class SubmenuComponent implements AfterViewInit, OnChanges {

  @ViewChild('submenu') submenu: any;
  @ViewChild('dropdown') dropdown: ElementRef;
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

  ngAfterViewInit(): void {
    if (AppConfig.MENU_HOVER_MODE) {
      this.renderer.listen(this.dropdown.nativeElement, 'mousemove', (event) => {
        this.onMouseMove(event);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.linkName = this.type === SubMenuType.user ? SubMenuDef.userMenu.linkName : SubMenuDef.languageMenu.linkName;
    this.items = this.type === SubMenuType.user ? SubMenuDef.userMenu.items : SubMenuDef.languageMenu.items;
  }

  onMouseClick(event) {
    console.log('onMouseClick: ' + event.x + ' ' + event.y);
    let curTime = new Date().getTime();
    if (this.subMenuState !== MenuState.collapsed || curTime - this.lastCollapsedTime > 50) {
      this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
      if (this.subMenuState === MenuState.expanded) {
        this.onToggled.emit(this.type);
      }
    }
  }

  onMouseMove(event) {
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

  insideDropDown(mouseX, mouseY) {
    let rect = this.dropdown.nativeElement.getBoundingClientRect();
    let left = rect.left, top = rect.top, width = rect.width, height = rect.height;
    // console.log(`insideDropDown(${this.type}) - (${mouseX}, ${mouseY})  X(${left}, ${left+width}) Y(${top}, ${top+height})`);
    return mouseX > left + 3 && mouseX < left + width - 3 && mouseY >= top && mouseY < top + height;
  }

  insideDropDownMenu(mouseX, mouseY) {
    let dropDownMenuElement = this.dropdown.nativeElement.querySelector('.dropdown-menu');
    let rect = dropDownMenuElement.getBoundingClientRect();
    let left = rect.left, top = rect.top, width = rect.width, height = rect.height;
    // console.log(`insideDropDownMenu - (${mouseX}, ${mouseY})  X(${left}, ${left+width}) Y(${top}, ${top+height})`);
    return mouseX > left + 3 && mouseX < left + width - 3 && mouseY >= top && mouseY < top + height - 1;
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
