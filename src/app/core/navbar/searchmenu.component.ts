import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchState } from 'app/config/menu.config';
import { CompleterCmp } from 'ng2-completer';

@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css']
})

export class SearchmenuComponent {

  @ViewChild('navbarSearchPanel') navbarSearchPanel: ElementRef;
  @ViewChild('openCloseExample') private openCloseExample: CompleterCmp;
  searchState: number;
  placeSearchString: string;
  openCloseFocused: boolean;
  placeSearchData: string[] = ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'];

  constructor() {
    this.searchState = SearchState.collapsed;
  }

  isSearchExpanded(): boolean {
    return this.searchState === SearchState.expanded;
  }

  onSearchClick(): void {
    this.searchState = this.searchState === SearchState.collapsed ? SearchState.expanded : SearchState.collapsed;
  }

  onOpened(isOpen: boolean): void {
  }
}
