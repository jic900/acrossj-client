import {
  Component,
  OnChanges,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MenuState } from 'app/config/app.config';
import { Util } from 'app/shared/util/util';
import { IMenuItem } from 'app/shared/interfaces/menuitem.interface';


@Component({
  selector: 'aj-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  host: {
    '(document:touchstart)': 'onClickOrTouch($event)',
    '(document:click)': 'onClickOrTouch($event)'
  },
  encapsulation: ViewEncapsulation.None
})

export class DropDownComponent implements OnChanges {

  @Input() dataList: IMenuItem[];
  @Input() placeHolder: string;
  @Input() displayProperty: string;
  @Input() displayMaxCount: number;
  @Input() sorted: boolean;
  @Input() autoComplete: boolean;
  @Input() filterFunc: Function;
  @Output() selected: EventEmitter<string>;
  @Output() clicked: EventEmitter<void>;
  @Output() blurred: EventEmitter<void>;
  inputString: string;
  displayList: IMenuItem[];
  selectedIndex: number;
  menuState: number;
  menuWidth: string;

  constructor(private elementRef: ElementRef, private translate: TranslateService) {
    this.dataList = [];
    this.placeHolder = 'Please Select';
    this.displayProperty = 'display';
    this.displayMaxCount = -1;
    this.sorted = false;
    this.autoComplete = false;
    this.filterFunc = this.defaultFilterfunc;
    this.selectedIndex = -1;
    this.inputString = '';
    this.displayList = [];
    this.menuState = MenuState.collapsed;
    this.selected = new EventEmitter<string>();
    this.clicked = new EventEmitter<void>();
    this.blurred = new EventEmitter<void>();
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (!this.autoComplete) {
        this.inputString = this.getTranslatedPlaceHolder();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sorted && this.dataList.length > 0) {
      this.dataList.sort(Util.sortByProperty(this.displayProperty));
    }
    if (!this.autoComplete) {
      this.displayList = this.dataList;
      this.inputString = this.getTranslatedPlaceHolder();
    }
  }

  private getTranslatedPlaceHolder(): string {
    return this.translate.instant(this.placeHolder);
  }

  defaultFilterfunc(filterString: string,
                    sourceList: IMenuItem[],
                    filterProperty: string,
                    maxCount: number): IMenuItem[] {
    let resultList = [];
    for (const item of sourceList) {
      const itemValue = item[filterProperty].toLowerCase();
      if (itemValue.indexOf(filterString.toLowerCase()) != -1) {
        resultList.push(item);
      }
    }
    const displayCount = maxCount === -1 ? resultList.length : Math.min(maxCount, resultList.length);
    return resultList.slice(0, displayCount);
  }

  onInputChange() {
    if (this.autoComplete) {
      if (this.inputString !== '') {
        this.updateDisplayList();
      } else {
        this.resetDisplayList();
      }
    }
  }

  onFocus(event): void {
    // console.log('onFocus  ' + event.target.tagName);
    if (! this.autoComplete) {
      this.inputBlurOnDevice();
    } else if (this.inputString !== '') {
      this.updateDisplayList();
    }
  }

  onBlur(event): void {
    // console.log('onBlur  ' + event.target.tagName);
    if (!Util.isPhoneOrTablet()) {
      let self = this;
      setTimeout(function() {
        self.resetDisplayList();
      }, 400);
    }
  }

  onKeyDown(event): void {
    // console.log('onKeyDown  ' + event.code);
    if (event.code === 'ArrowDown') {
      if (this.menuState === MenuState.expanded && this.selectedIndex !== this.displayList.length - 1) {
        this.selectedIndex++;
      }
      event.preventDefault();
    } else if (event.code === 'ArrowUp') {
      if (this.menuState === MenuState.expanded && this.selectedIndex > 0) {
        this.selectedIndex--;
      }
      event.preventDefault();
    } else if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.which === 13) {
      if (this.menuState === MenuState.expanded) {
        if (this.autoComplete) {
          this.inputBlurOnDevice();
        }
        if (this.selectedIndex !== -1) {
          this.inputString = this.displayList[this.selectedIndex][this.displayProperty];
        }
        this.resetDisplayList();
        this.emitSelected();
      }
    }
  }

  onClick(event): void {
    // console.log('onClick  ' + event.target.tagName);
    if (! this.autoComplete) {
      if (! this.isDropDownExpanded()) {
        this.emitClicked();
        const self = this;
        setTimeout(function() {
          self.toggleMenuState();
        }, 280);
      } else {
        this.emitBlurred();
        this.toggleMenuState();
      }
    } else {
      this.emitClicked();
    }
  }

  onSelect(item) {
    // console.log('onSelect  ' + item);
    this.inputString = item[this.displayProperty];
    this.resetDisplayList();
    this.emitSelected();
  }

  private toggleMenuState(): void {
    this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
  }

  clearField(): void {
    this.inputString = this.autoComplete ? '' : this.getTranslatedPlaceHolder();
  }

  resetDisplayList(): void {
    if (this.autoComplete) {
      this.displayList = [];
    }
    this.selectedIndex = -1;
    this.menuState = MenuState.collapsed;
  }

  updateDisplayList(): void {
    this.displayList = this.filterFunc(this.inputString, this.dataList, this.displayProperty, this.displayMaxCount);
    // console.log('updateDisplayList: size=' + this.displayList.length);
    if (this.displayList.length > 0) {
      const self = this;
      setTimeout(function() {
        self.menuState = MenuState.expanded;
      }, 280);
    }
  }

  onClickOrTouch(event): void {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
        break;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.resetDisplayList();
      this.emitBlurred();
    } else if (this.autoComplete && this.inputString !== '') {
      this.updateDisplayList();
      this.selectedIndex = -1;
    }
  }

  isDropDownExpanded(): boolean {
    return this.menuState === MenuState.expanded;
  }

  private inputBlurOnDevice(): void {
    if (Util.isPhoneOrTablet() && !Util.isDeviceSimulator()) {
      const inputField = this.elementRef.nativeElement.querySelector('#dropDownInput');
      inputField.blur();
    }
  }

  private emitClicked(): void {
    this.clicked.emit();
    this.setMenuWidth();
  }

  private emitSelected(): void {
    this.selected.emit(this.inputString);
    this.setMenuWidth();
  }

  private emitBlurred(): void {
    this.blurred.emit();
    this.setMenuWidth();
  }

  private setMenuWidth(): void {
    const self = this;
    setTimeout(function() {
      const style = window.getComputedStyle(self.elementRef.nativeElement.firstElementChild);
      self.menuWidth = style.getPropertyValue('width');
    }, 250);
  }
}
