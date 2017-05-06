import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

import { MenuState } from 'app/config/menu.config';
import { AppConfig, AppConstant } from 'app/config/app.config';
import { IOptions } from 'app/shared/components/daterangepicker/interfaces/options.interface';
import { DateRangePicker } from 'app/shared/components/daterangepicker/daterangepicker.component';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css']
})

export class SearchMenuComponent implements AfterViewInit {

  dataList: string[] = ['Vatican City', 'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland',
    'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom'];

  categoryList: string[] = ['Skii', 'Bicycling', 'Hiking', 'Others'];

  dateRangePickerOptions: IOptions = {
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
  };

  @ViewChild('navbarSearchPanel') searchPanel: ElementRef;
  @ViewChild(DateRangePicker) dateRangePicker: DateRangePicker;
  @ViewChild('categoryPanel') categoryPanel: ElementRef;
  searchMenuState: number;
  fieldWidth: number;
  fieldHeight: number;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.searchMenuState = MenuState.collapsed;
  }

  ngAfterViewInit(): void {
    this.setFieldWidth();
    this.setFieldHeight();
    // this.setDatePickerInputWidth();
  }

  isSearchMenuExpanded(): boolean {
    return this.searchMenuState === MenuState.expanded;
  }


  // getWidth(): string {
  //   const windowWidth = window.innerWidth;
  //   if (windowWidth > AppConstant.IPHONE6__WIDTH) {
  //     const widthPercent = 100 - (windowWidth - AppConstant.IPHONE6__WIDTH) * 100 / (windowWidth * 1.5);
  //     return widthPercent + '%';
  //   } else {
  //     return '88%';
  //   }
  // }

  getMinHeight(): string {
    const offset = 20;
    return Util.isPhoneOrTablet() ? (window.innerHeight + offset) + 'px' : '';
  }

  getMaxHeight(): string {
    const navbarHeight = 50;
    const navbarSearchPaddingVertical = 30;
    return Util.isPhoneOrTablet() ? (window.innerHeight - navbarHeight - navbarSearchPaddingVertical) + 'px' : '';
  }

  getOverflowY(): string {
    return Util.isPhoneOrTablet() ? 'scroll !important' : 'none';
  }

  // getAutoCompleterWidth(): number {
  //   const panelBodyElem = this.elementRef.nativeElement.querySelector('.panel-body');
  //   return panelBodyElem.offsetWidth;
  // }
  //
  // getDateRangePickerWidth(): number {
  //   const panelBodyElem = this.elementRef.nativeElement.querySelector('.panel-body');
  //   return panelBodyElem.offsetWidth;
  // }

  setFieldWidth() {
    let widthPercent = 88;
    const windowWidth = window.innerWidth;
    if (windowWidth > AppConstant.IPHONE6__WIDTH) {
      widthPercent = 100 - (windowWidth - AppConstant.IPHONE6__WIDTH) * 100 / (windowWidth * 1.5);
    }
    this.fieldWidth = windowWidth * widthPercent / 100;
  }

  setFieldHeight(): void {
    this.fieldHeight =  this.elementRef.nativeElement.querySelector('#completerInput').offsetHeight;
  }

  setSearchMenuState(newState: number) {
    this.searchMenuState = newState;
  }

  toggleSearchMenuState(): void {
    this.searchMenuState = this.searchMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
  }

  // setDatePickerInputWidth(): void {
  //   const mydrpDiv = this.dateRangePicker.elem.nativeElement.firstElementChild;
  //   const selectionInput = this.dateRangePicker.elem.nativeElement.querySelector('.selection');
  //   const panelBodyElem = this.elementRef.nativeElement.getElementsByClassName('panel-body')[0];
  //   this.renderer.setStyle(mydrpDiv, 'width', panelBodyElem.offsetWidth + 'px');
  //   this.renderer.setStyle(selectionInput, 'height', panelBodyElem.offsetHeight + 'px');
  // }
  //
  // setDatePickerCalendarWidth(): void {
  //   const selectorDiv = this.dateRangePicker.elem.nativeElement.querySelector('.selector');
  //   if (selectorDiv !== null && selectorDiv !== undefined) {
  //     const panelBodyElem = this.elementRef.nativeElement.getElementsByClassName('panel-body')[0];
  //     this.renderer.setStyle(selectorDiv, 'width', panelBodyElem.offsetWidth + 'px');
  //   }
  // }

  onCalendarOpened(isOpened: boolean): void {
    if (isOpened) {
      const selectorDiv = this.dateRangePicker.elem.nativeElement.querySelector('.selector');
      const panelBodyElem = this.elementRef.nativeElement.getElementsByClassName('panel-body')[0];
      if (selectorDiv !== null && selectorDiv != undefined) {
        this.renderer.setStyle(selectorDiv, 'width', panelBodyElem.offsetWidth + 'px');
      }
    }
  }

  // updateDateRangePickerOnWindowResize() {
  //   this.setDatePickerInputWidth();
  //   this.setDatePickerCalendarWidth();
  // }

  // onCalendarViewChanged(event): void {
  //   console.log('onCalendarViewChanged');
  //   const selectorDiv = this.datePickerPanel.nativeElement.querySelector('.selector');
  //   const panelBodyElem = this.navbarSearchPanel.nativeElement.getElementsByClassName('panel-body')[0];
  //   if (selectorDiv !== null && selectorDiv != undefined) {
  //     this.renderer.setStyle(selectorDiv, 'width', panelBodyElem.offsetWidth + 'px');
  //     const selectorDivRect = selectorDiv.getBoundingClientRect();
  //     // const marginTop = this.searchFieldDefaultMarginTop + selectorDiv.offsetHeight;
  //     const marginTop = this.searchFieldDefaultMarginTop + 330;
  //     this.renderer.setStyle(this.categoryPanel.nativeElement, 'margin-top', marginTop + 'px');
  //   }
  // }
  //
  // onDateRangeChanged(event): void {
  //   console.log('onDateRangeChanged');
  //   this.renderer.setStyle(this.categoryPanel.nativeElement, 'margin-top', this.searchFieldDefaultMarginTop + 'px');
  // }
  //
  // onInputFocusBlur(event): void {
  //   console.log('onInputFocusBlur - ' + event);
  //   this.renderer.setStyle(this.categoryPanel.nativeElement, 'margin-top', this.searchFieldDefaultMarginTop + 'px');
  // }

  filterPlaces(searchString: string, dataList: string[]): string[] {
    dataList.sort((a, b) => a.toLowerCase() !== b.toLowerCase() ? a.toLowerCase() < b.toLowerCase() ? -1 : 1 : 0);

    let filteredList = [], startsWithList = [], includesList = [];
    const lowerSearchStr = searchString.toLowerCase();
    for (const item of dataList) {
      const lowerItem = item.toLowerCase();
      if (lowerItem === lowerSearchStr) {
        filteredList.push(item);
      } else if (lowerItem.startsWith(lowerSearchStr)) {
        startsWithList.push(item);
      } else if (lowerItem.indexOf(lowerSearchStr) != -1) {
        includesList.push(item);
      }
    }
    return filteredList.concat(startsWithList).concat(includesList).slice(0, AppConfig.PLACE_SEARCH_RESULT_LIMIT);
  }

  onPlaceSelected(inputString): void {

  }
}
