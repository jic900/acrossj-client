import { Component } from '@angular/core';
import * as _ from 'lodash';

import { SearchMenuConfig } from 'app/config/core/searchmenu.config';
import { AppConstant } from 'app/config/common/app-constant.config';
import { MenuState } from 'app/config/common/menustate.config';
import { Util } from 'app/shared/util/util';
import { SearchService } from '../services/search.service';
import { IDropDownElement } from 'app/config/interfaces/dropdown-element.interface';
import { IDateRangePickerElement } from 'app/config/interfaces/daterangepicker-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';

interface ISearchMenu {
  title: IElement;
  placeSearcher: IDropDownElement;
  dateRangePicker: IDateRangePickerElement;
  categoryPicker: IDropDownElement;
  clearAll: IElement;
}

@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css'],
  providers: [SearchService]
})

export class SearchMenuComponent {

  searchMenuData: ISearchMenu;
  searchMenuState: number;
  fieldWidth: string;

  constructor(public searchService: SearchService) {
    this.searchMenuData = _.mapKeys(new SearchMenuConfig().elements, 'name');
    this.searchMenuState = MenuState.collapsed;
    this.setFieldWidth();
  }

  isSearchMenuExpanded(): boolean {
    return this.searchMenuState === MenuState.expanded;
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
    if (windowWidth > AppConstant.IPHONE6_WIDTH) {
      widthPercent = 100 - (windowWidth - AppConstant.IPHONE6_WIDTH) * 100 / (windowWidth * 1.5);
    }
    this.fieldWidth = windowWidth * widthPercent / 100 + 'px';
  }

  setSearchMenuState(newState: number) {
    this.searchMenuState = newState;
  }

  toggleSearchMenuState(): void {
    this.searchMenuState = this.searchMenuState === MenuState.collapsed ? MenuState.expanded : MenuState.collapsed;
  }

  onPlaceSelected(event): void {
  }

  onCategorySelected(event): void {
  }
}
