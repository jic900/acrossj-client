import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';

import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  host: {
    '(document:touchstart)': 'onClickOrTouch($event)',
    '(document:click)': 'onClickOrTouch($event)'
  }
})
export class AutoComplete {

  @Input() dataList: string[];
  @Input() placeHolder: string;
  @Input() width: number;
  @Input() filterFunc: Function;
  @Output() opened: EventEmitter<number>;
  @Output() selected: EventEmitter<string>;
  @ViewChild('completerInput') completerInput: ElementRef;
  inputString: string;
  filteredList: string[];
  selectedIdx: number;

  constructor(private elementRef: ElementRef) {
    this.selectedIdx = -1;
    this.inputString = '';
    this.filteredList = [];
    this.width = 200;
    this.opened = new EventEmitter<number>();
    this.selected = new EventEmitter<string>();
  }

  onFocus(event): void {
    if (this.inputString !== '') {
      this.updateFilteredList();
    }
  }

  onBlur(event): void {
    if (!Util.isPhoneOrTablet()) {
      let self = this;
      setTimeout(function() {
        self.resetFilteredList();
      }, 400);
    }
  }

  onKeyUp(event): void {
    if (this.inputString !== '') {
      if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.which === 13) {
        if (Util.isPhoneOrTablet()) {
          this.completerInput.nativeElement.blur();
        }
        if (this.selectedIdx !== -1) {
          this.inputString = this.filteredList[this.selectedIdx];
        }
        this.resetFilteredList();
        this.selected.emit(this.inputString);
      } else if (event.code === 'ArrowDown') {
        if (this.selectedIdx !== this.filteredList.length - 1) {
          this.selectedIdx++;
        }
        event.preventDefault();
      } else if (event.code === 'ArrowUp') {
        if (this.selectedIdx > 0) {
          this.selectedIdx--;
        }
        event.preventDefault();
      } else {
        this.updateFilteredList();
      }
    } else {
      this.resetFilteredList();
    }
  }

  onSelect(item) {
    this.inputString = item;
    this.resetFilteredList();
    this.selected.emit(this.inputString);
  }

  resetFilteredList(): void {
    this.filteredList = [];
    this.selectedIdx = -1;
    this.opened.emit(0);
  }

  updateFilteredList(): void {
    this.filteredList =  this.filterFunc(this.inputString, this.dataList);
    this.opened.emit(this.filteredList.length);
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
      this.resetFilteredList();
    } else if (this.inputString !== '') {
      this.updateFilteredList();
      this.selectedIdx = -1;
    }
  }
}
