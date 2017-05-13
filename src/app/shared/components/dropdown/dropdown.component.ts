import {
  Component,
  OnChanges,
  Input,
  Output,
  ElementRef,
  EventEmitter,
  SimpleChanges
} from '@angular/core';

import { IListItem } from 'app/shared/interfaces/listitem.interface';
import { MenuState } from 'app/config/menu.config';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  host: {
    '(document:touchstart)': 'onClickOrTouch($event)',
    '(document:click)': 'onClickOrTouch($event)'
  }
})

export class DropDownComponent implements OnChanges {

  @Input() dataList: IListItem[];
  @Input() placeHolder: string;
  @Input() width: number;
  @Input() height: number;
  @Input() displayProperty: string;
  @Input() displayMaxCount: number;
  @Input() sorted: boolean;
  @Input() autoComplete: boolean;
  @Input() filterFunc: Function;
  // @Output() opened: EventEmitter<number>;
  @Output() selected: EventEmitter<string>;
  inputString: string;
  displayList: IListItem[];
  selectedIndex: number;
  menuState: number;

  constructor(private elementRef: ElementRef) {
    this.dataList = [];
    this.placeHolder = 'Please Select';
    this.width = 200;
    this.height = 36;
    this.displayProperty = 'label';
    this.displayMaxCount = -1;
    this.sorted = false;
    this.autoComplete = false;
    this.filterFunc = this.defaultFilterfunc;
    this.selectedIndex = -1;
    this.inputString = '';
    this.displayList = [];
    this.menuState = MenuState.collapsed;
    // this.opened = new EventEmitter<number>();
    this.selected = new EventEmitter<string>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.hasOwnProperty('dataList')) {
    //   this.dataList = changes['dataList'].currentValue;
    // }
    // if (changes.hasOwnProperty('sorted')) {
    //   this.sorted = changes['sorted'].currentValue;
    // }
    // if (changes.hasOwnProperty('autoComplete')) {
    //   this.autoComplete = changes['autoComplete'].currentValue;
    // }
    if (this.sorted && this.dataList.length > 0) {
      this.dataList.sort(Util.sortByProperty(this.displayProperty));
    }
    if (!this.autoComplete) {
      this.displayList = this.dataList;
      this.inputString = this.placeHolder;
    }
  }

  defaultFilterfunc(filterString: string,
                    sourceList: IListItem[],
                    filterProperty: string,
                    maxCount: number): IListItem[] {
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
        this.selected.emit(this.inputString);
      }
    }
  }

  onClick(event): void {
    // console.log('onClick  ' + event.target.tagName);
    if (! this.autoComplete) {
      this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    }
  }

  onSelect(item) {
    // console.log('onSelect  ' + item);
    this.inputString = item[this.displayProperty];
    this.resetDisplayList();
    this.selected.emit(this.inputString);
  }

  clearField(): void {
    this.inputString = this.autoComplete ? '' : this.placeHolder;
  }

  resetDisplayList(): void {
    if (this.autoComplete) {
      this.displayList = [];
    }
    this.selectedIndex = -1;
    this.menuState = MenuState.collapsed;
    // this.opened.emit(0);
  }

  updateDisplayList(): void {
    this.displayList = this.filterFunc(this.inputString, this.dataList, this.displayProperty, this.displayMaxCount);
    // console.log('updateDisplayList: size=' + this.displayList.length);
    if (this.displayList.length > 0) {
      this.menuState = MenuState.expanded;
    }
    // this.opened.emit(this.filteredList.length);
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
    } else if (this.autoComplete && this.inputString !== '') {
      this.updateDisplayList();
      this.selectedIndex = -1;
    }
  }

  isDropDownExpanded(): boolean {
    return this.menuState === MenuState.expanded;
  }

  private inputBlurOnDevice(): void {
    if (Util.isPhoneOrTablet() && !Util.isDeviceSimulator) {
      const inputField = this.elementRef.nativeElement.querySelector('#dropDownInput');
      inputField.blur();
    }
  }
}
