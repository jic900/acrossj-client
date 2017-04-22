import {Component, ViewChild, ElementRef } from '@angular/core';
import { SearchState } from 'app/config/menu.config';

@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css']
})

export class SearchmenuComponent {

  @ViewChild('navbarSearchPanel') navbarSearchPanel: ElementRef;
  searchState: number;

  constructor() {
    this.searchState = SearchState.collapsed;
  }

  isSearchExpanded(): boolean {
    return this.searchState === SearchState.expanded;
  }

  onSearchClick(): void {
    this.searchState = this.searchState === SearchState.collapsed ? SearchState.expanded : SearchState.collapsed;
  }
}
