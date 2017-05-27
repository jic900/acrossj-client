import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { AppConstant, MenuState} from 'app/config/app.config';
import { Util } from 'app/shared/util/util';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'aj-searchmenu',
  templateUrl: './searchmenu.component.html',
  styleUrls: ['./searchmenu.component.css'],
  providers: [SearchService]
})

export class SearchMenuComponent {

  searchMenuState: number;
  fieldWidth: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2,
              public searchService: SearchService, private translate: TranslateService) {
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
