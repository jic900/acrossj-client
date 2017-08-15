import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AppConstant } from 'app/config/common/app-constant.config';
import { MenuState } from 'app/config/common/menustate.config';
import { IListElement } from 'app/config/interfaces/list-element.interface';

@Component({
  selector: 'aj-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  host: {
    '(document:mouseup)': 'onMouseUp($event)'
  }
})

export class SubMenuComponent {

  @Input() menuData: IListElement;
  @Output() subMenuToggled: EventEmitter<any>;
  @Output() subMenuClicked: EventEmitter<void>;
  subMenuState: number;
  otherMenuExpanded: boolean;

  constructor(private elementRef: ElementRef, private translate: TranslateService) {
    this.subMenuState = MenuState.collapsed;
    this.subMenuToggled = new EventEmitter<{string, boolean}>();
    this.subMenuClicked = new EventEmitter<void>();
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
    this.subMenuToggled.emit({name: this.menuData.name, expanded: !this.isSubMenuExpanded()});
    if (this.isDeviceWidth() && !this.isSubMenuExpanded() && this.otherMenuExpanded) {
      const self = this;
      setTimeout(function() {
        self.subMenuState = MenuState.expanded;
      }, 300);
    } else {
      this.subMenuState = this.subMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    }
  }

  onSubMenuClick(langName: string): void {
    if (this.menuData.name === 'language') {
      const curLang = this.translate.currentLang;
      if (langName !== curLang) {
        this.translate.use(langName);
      }
    }
    this.subMenuState = MenuState.collapsed;
    this.subMenuClicked.emit();
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
}
