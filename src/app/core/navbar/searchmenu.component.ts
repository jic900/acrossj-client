import {
  Component,
  ViewChild,
  ElementRef,
  Renderer2,
  AfterViewInit
} from '@angular/core';

import { SearchState } from 'app/config/menu.config';
import { AppConfig } from 'app/config/app.config';

@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css'],
})

export class SearchmenuComponent implements AfterViewInit {

  dataList: string[] = ["Vatican City", "Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia & Herzegovina",
    "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia",
    "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein",
    "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands",
    "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia",
    "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom"];

  @ViewChild('navbarSearchPanel') navbarSearchPanel: ElementRef;
  @ViewChild('datePicker') datePickerPanel: ElementRef;
  searchState: number;
  datePickerPanelMarginTop: number;

  constructor(private renderer: Renderer2) {
    this.searchState = SearchState.collapsed;
  }

  ngAfterViewInit(): void {
    const style = this.datePickerPanel.nativeElement.currentStyle || window.getComputedStyle(this.datePickerPanel.nativeElement);
    this.datePickerPanelMarginTop = style.marginTop.substring(0, style.marginTop.length - 2) * 1;
  }

  isSearchExpanded(): boolean {
    return this.searchState === SearchState.expanded;
  }

  onSearchClick(): void {
    this.searchState = this.searchState === SearchState.collapsed ? SearchState.expanded : SearchState.collapsed;
  }

  getWidth(): number {
    const panelGroupElem = this.navbarSearchPanel.nativeElement.getElementsByClassName('panel-group')[0];
    return panelGroupElem.offsetWidth;
  }

  filterPlaces(searchString: string, dataList: string[]): string[] {
    dataList.sort((a, b) => a.toLowerCase() !== b.toLowerCase() ? a.toLowerCase() < b.toLowerCase() ? -1 : 1 : 0);

    let filteredList = [], startsWithList = [], includesList = [];
    const lowerSearchStr = searchString.toLowerCase();
    for (let item of dataList) {
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

  onPlaceAutoCompleteOpened(numSuggestions: number) {
    let marginTop = this.datePickerPanelMarginTop;
    if (numSuggestions > 0) {
      marginTop += numSuggestions * 35;
    }
    this.renderer.setStyle(this.datePickerPanel.nativeElement, 'margin-top', marginTop + 'px');
  }

  onPlaceSelected(inputString): void {

  }
}
