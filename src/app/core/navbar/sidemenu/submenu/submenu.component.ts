import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AppConstant, MenuState } from 'app/config/app.config';
import { IMenuItem } from 'app/shared/interfaces/menuitem.interface';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  host: {
    '(document:mouseup)': 'onMouseUp($event)'
  }
})

export class SubMenuComponent {

  @Input() menuData: IMenuItem;
  @Output() subMenuToggled: EventEmitter<any>;
  subMenuState: number;
  otherMenuExpanded: boolean;

  constructor(private elementRef: ElementRef, private translate: TranslateService) {
    this.subMenuState = MenuState.collapsed;
    this.subMenuToggled = new EventEmitter<{string, boolean}>();
    this.otherMenuExpanded = false;
  }

  isSubMenuExpanded(): boolean {
    return this.subMenuState === MenuState.expanded;
  }

  onOtherSubMenuToggled(expanded: boolean): void {
    this.otherMenuExpanded = expanded;
    if (expanded && this.isSubMenuExpanded()) {
      this.subMenuState = MenuState.collapsed;
    }
  }

  onClick(event): void {
    this.subMenuToggled.emit({type: this.menuData.type, expanded: !this.isSubMenuExpanded()});
    if (this.isDeviceWidth() && !this.isSubMenuExpanded() && this.otherMenuExpanded) {
      const self = this;
      setTimeout(function() {
        self.subMenuState = MenuState.expanded;
      }, 300);
    } else {
      this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    }
  }

  onSubMenuClick(type: string): void {
    if (this.menuData.type === 'language') {
      const curLang = this.translate.currentLang;
      if (type !== curLang) {
        this.translate.use(type);
      }
    }
    this.subMenuState = MenuState.collapsed;
  }

  onMouseUp(event): void {
    const nativeElement = this.elementRef.nativeElement;
    if (!this.isDeviceWidth() && this.isSubMenuExpanded() &&
        event.target && nativeElement !== event.target && ! nativeElement.contains(event.target)) {
      this.subMenuState = MenuState.collapsed;
    }
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }

  showLogout(): boolean {
    return this.menuData.type === 'user' && ! this.isDeviceWidth();
  }
}
