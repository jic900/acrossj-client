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
import { IListItem } from 'app/shared/interfaces/listitem.interface';

@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css']
})

export class SearchMenuComponent implements AfterViewInit {

  places: string[] = ['Vatican City', 'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland',
    'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom'];

  placeList: IListItem[];

  categoryList: IListItem[] = [
    {iconClass: '', label: 'Skii', description: 'Skii'},
    {iconClass: 'fa fa-bicycle', label: 'Bicycling', description: 'Bicycling'},
    {iconClass: undefined, label: 'Hiking', description: 'Hiking'},
    {iconClass: undefined, label: 'Other', description: 'Other'}
  ];

  dateRangePickerOptions: IOptions = {
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
  };

  searchMenuState: number;
  fieldWidth: number;
  fieldHeight: number;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.searchMenuState = MenuState.collapsed;
    this.placeList = this.getPlaceList();
  }

  ngAfterViewInit(): void {
    this.setFieldWidth();
    this.setFieldHeight();
  }

  isSearchMenuExpanded(): boolean {
    return this.searchMenuState === MenuState.expanded;
  }

  private getPlaceList(): IListItem[] {
    let resultList: IListItem[] = [];
    for (const place of this.places) {
      resultList.push({iconClass: undefined, label: place, description: place});
    }
    return resultList;
  }

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
    return Util.isPhoneOrTablet() ? 'scroll' : 'none';
  }

  setFieldWidth() {
    let widthPercent = 88;
    const windowWidth = window.innerWidth;
    if (windowWidth > AppConstant.IPHONE6__WIDTH) {
      widthPercent = 100 - (windowWidth - AppConstant.IPHONE6__WIDTH) * 100 / (windowWidth * 1.5);
    }
    this.fieldWidth = windowWidth * widthPercent / 100;
  }

  setFieldHeight(): void {
    this.fieldHeight = this.elementRef.nativeElement.querySelector('#dropDownInput').offsetHeight;
  }

  setSearchMenuState(newState: number) {
    this.searchMenuState = newState;
  }

  toggleSearchMenuState(): void {
    this.searchMenuState = this.searchMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
  }

  getDisplayedPlacesMaxCount(): number {
    return AppConfig.PLACE_SEARCH_RESULT_LIMIT;
  }

  filterPlaces(filterString: string,
               sourceList: IListItem[],
               filterProperty: string,
               maxCount: number): IListItem[] {
    let filteredList = [], startsWithList = [], includesList = [];
    const lowerSearchStr = filterString.toLowerCase();
    for (const item of sourceList) {
      const lowerItem = item[filterProperty].toLowerCase();
      if (lowerItem === lowerSearchStr) {
        filteredList.push(item);
      } else if (lowerItem.startsWith(lowerSearchStr)) {
        startsWithList.push(item);
      } else if (lowerItem.indexOf(lowerSearchStr) != -1) {
        includesList.push(item);
      }
    }
    return filteredList.concat(startsWithList).concat(includesList).slice(0, maxCount);
  }

  onPlaceSelected(event): void {
  }

  onCategorySelected(event): void {
  }
}
