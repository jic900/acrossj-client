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
    // this.width = 200;
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
    console.log(this.dataList);
    console.log(this.sorted);
    console.log(this.autoComplete);
    console.log(this.autoComplete);
    if (this.sorted && this.dataList.length > 0) {
      this.dataList.sort(Util.sortByProperty(this.displayProperty));
    }
    if (!this.autoComplete) {
      this.displayList = this.dataList;
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
    return this.displayList.slice(0, displayCount);
  }

  onFocus(event): void {
    if (this.autoComplete && this.inputString !== '') {
      this.updateDisplayList();
    }
  }

  onBlur(event): void {
    if (this.autoComplete && !Util.isPhoneOrTablet()) {
      let self = this;
      setTimeout(function() {
        self.resetDisplayList();
      }, 400);
    }
  }

  onKeyUp(event): void {
    if (this.inputString !== '') {
      if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.which === 13) {
        if (this.autoComplete && Util.isPhoneOrTablet()) {
          const inputField = this.elementRef.nativeElement.querySelector('#dropDownInput');
          inputField.blur();
        }
        if (this.selectedIndex !== -1) {
          this.inputString = this.displayList[this.selectedIndex][this.displayProperty];
        }
        this.resetDisplayList();
        this.selected.emit(this.inputString);
      } else if (event.code === 'ArrowDown') {
        if (this.selectedIndex !== this.displayList.length - 1) {
          this.selectedIndex++;
        }
        event.preventDefault();
      } else if (event.code === 'ArrowUp') {
        if (this.selectedIndex > 0) {
          this.selectedIndex--;
        }
        event.preventDefault();
      } else if (this.autoComplete) {
        this.updateDisplayList();
      }
    } else {
      this.resetDisplayList();
    }
  }

  onClick(event): void {
    if (! this.autoComplete) {
      this.menuState = this.menuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
    }
    // const inputElement: HTMLElement = this.elementRef.nativeElement.querySelector('#dropDownInput');
    // inputElement.focus();
  }

  onSelect(item) {
    this.inputString = item[this.displayProperty];
    this.resetDisplayList();
    this.selected.emit(this.inputString);
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

  onSelectItem(itemLabel: string): void {
  }
}
