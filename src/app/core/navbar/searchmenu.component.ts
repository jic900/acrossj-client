import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';

import { SearchState } from 'app/config/menu.config';
import { AppConfig } from 'app/config/app.config';
import { IOptions } from 'app/shared/components/daterangepicker/interfaces/options.interface';
import { DateRangePicker } from 'app/shared/components/daterangepicker/daterangepicker.component';

@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css']
})

export class SearchmenuComponent implements AfterViewInit {

  dataList: string[] = ['Vatican City', 'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland',
    'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom'];

  dateRangePickerOptions: IOptions = {
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
  };

  @ViewChild(DateRangePicker) dateRangePicker: DateRangePicker;
  @ViewChild('categoryPanel') categoryPanel: ElementRef;
  searchState: number;
  defaultMarginTop: number;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.searchState = SearchState.collapsed;
  }

  ngAfterViewInit(): void {
    const datePickerPanelElement = this.elementRef.nativeElement.querySelector('#datePickerPanel');
    const style = datePickerPanelElement.currentStyle || window.getComputedStyle(datePickerPanelElement);
    this.defaultMarginTop = style.marginTop.substring(0, style.marginTop.length - 2) * 1;
    this.setDatePickerInputWidth();
  }

  isSearchExpanded(): boolean {
    return this.searchState === SearchState.expanded;
  }

  onSearchClick(): void {
    this.searchState = this.searchState === SearchState.collapsed ? SearchState.expanded : SearchState.collapsed;
  }

  getFieldWidth(): number {
    const panelBodyElem = this.elementRef.nativeElement.getElementsByClassName('panel-body')[0];
    return panelBodyElem.offsetWidth;
  }

  setDatePickerInputWidth(): void {
    const mydrpDiv = this.dateRangePicker.elem.nativeElement.firstElementChild;
    const selectionInput = this.dateRangePicker.elem.nativeElement.querySelector('.selection');
    const panelBodyElem = this.elementRef.nativeElement.getElementsByClassName('panel-body')[0];
    this.renderer.setStyle(mydrpDiv, 'width', panelBodyElem.offsetWidth + 'px');
    this.renderer.setStyle(selectionInput, 'height', panelBodyElem.offsetHeight + 'px');
  }

  setDatePickerCalendarWidth(): void {
    const selectorDiv = this.dateRangePicker.elem.nativeElement.querySelector('.selector');
    if (selectorDiv !== null && selectorDiv !== undefined) {
      const panelBodyElem = this.elementRef.nativeElement.getElementsByClassName('panel-body')[0];
      this.renderer.setStyle(selectorDiv, 'width', panelBodyElem.offsetWidth + 'px');
    }
  }

  onCalendarOpened(isOpened: boolean): void {
    if (isOpened) {
      const selectorDiv = this.dateRangePicker.elem.nativeElement.querySelector('.selector');
      const panelBodyElem = this.elementRef.nativeElement.getElementsByClassName('panel-body')[0];
      if (selectorDiv !== null && selectorDiv != undefined) {
        this.renderer.setStyle(selectorDiv, 'width', panelBodyElem.offsetWidth + 'px');
      }
    }
  }

  updateDateRangePickerOnWindowResize() {
    this.setDatePickerInputWidth();
    this.setDatePickerCalendarWidth();
  }

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
