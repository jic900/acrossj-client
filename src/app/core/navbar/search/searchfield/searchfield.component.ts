import { Component, HostListener } from '@angular/core';
import { SearchService } from '../services/search.service';
import { AppConstant } from 'app/config/app.config';

@Component({
  selector: 'aj-searchfield',
  templateUrl: './searchfield.component.html',
  styleUrls: ['./searchfield.component.css'],
  providers: [SearchService]
})

export class SearchfieldComponent{

  fieldWidth: string;
  placesWidth: string;
  dateRangePickerWidth: string;
  categoryWidth: string;
  fieldHeight: string;
  showSearch: boolean;

  constructor(public searchService: SearchService) {
    this.showSearch = false;
    this.setFieldWidth(0);
    this.setSubFieldWidth('0');
    this.fieldHeight = '30px';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    if (event.target.innerWidth >= AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT) {
      this.setFieldWidth(event.target.innerWidth);
    } else {
      this.setFieldWidth(0);
      this.setSubFieldWidth('0');
    }
  }

  onSearchClicked(event): void {
    this.showSearch = ! this.showSearch;
    if (this.showSearch) {
      this.setFieldWidth(window.innerWidth);
      this.setSubFieldWidth('100%');
    } else {
      this.setFieldWidth(0);
      this.setSubFieldWidth('0');
    }
  }

  onFieldClicked(id: string): void {
    this.setSubFieldWidth('100%');
    if (id === 'placeSearcher') {
      this.placesWidth = '300%';
    } else if (id === 'categoryPicker') {
      this.categoryWidth = '150%';
    }
  }

  onFieldBlurred(id: string) {
    if (id === 'placeSearcher') {
      this.placesWidth = '100%';
    } else if (id === 'categoryPicker') {
      this.categoryWidth = '100%';
    } else if (id === 'dateRangePicker') {
      this.dateRangePickerWidth = '100%';
    }
  }

  onCalendarOpened(isOpened: boolean) {
    if (isOpened) {
      this.setSubFieldWidth('100%');
      this.dateRangePickerWidth = '300%';
    } else {
      this.dateRangePickerWidth = '100%';
    }
  }

  onPlaceSelected(event): void {
    this.placesWidth = '100%';
  }

  onCategorySelected(event): void {
    this.categoryWidth = '100%';
  }

  private setFieldWidth(windowWidth: number): void {
    if (windowWidth === 0) {
      this.fieldWidth = '0';
    } else {
      const maxFieldWidth = 700;
      const minFieldWidth = 420;
      const fieldWidthRange = maxFieldWidth - minFieldWidth;
      const maxWindowWidth = 1536;
      const minWindowWidth = AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
      const windowWidthRange = maxWindowWidth - minWindowWidth;
      this.fieldWidth = (minFieldWidth + (windowWidth - minWindowWidth) * fieldWidthRange / windowWidthRange) + 'px';
    }
  }

  private setSubFieldWidth(newWidth: string) {
    this.placesWidth = newWidth;
    this.dateRangePickerWidth = newWidth;
    this.categoryWidth = newWidth;
  }
}
