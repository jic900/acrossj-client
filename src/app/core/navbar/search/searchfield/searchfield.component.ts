import { Component } from '@angular/core';
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
    this.fieldWidth = '0';
    this.placesWidth = '0';
    this.dateRangePickerWidth = '0';
    this.categoryWidth = '0';
    this.fieldHeight = '30px';
  }

  onSearchClicked(event): void {
    this.showSearch = ! this.showSearch;
    if (this.showSearch) {
      const maxFieldWidth = 700;
      const minFieldWidth = 420;
      const fieldWidthRange = maxFieldWidth - minFieldWidth;
      const maxWindowWidth = 1536;
      const minWindowWidth = AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
      const windowWidthRange = maxWindowWidth - minWindowWidth;
      const windowWidth = window.innerWidth;
      this.fieldWidth = (minFieldWidth + (window.innerWidth - minWindowWidth) * fieldWidthRange / windowWidthRange) + 'px';
      this.placesWidth = '100%';
      this.dateRangePickerWidth = '100%';
      this.categoryWidth = '100%';
    } else {
      this.fieldWidth = '0';
      this.placesWidth = '0';
      this.dateRangePickerWidth = '0';
      this.categoryWidth = '0';
    }
  }

  onFieldClicked(id: string) {
    this.resetWidth();
    if (id === 'placeSearcher') {
      this.placesWidth = '300%';
    } else if (id === 'categoryPicker') {
      this.categoryWidth = '150%';
    } else if (id === 'dateRangePicker') {
      this.dateRangePickerWidth = '300%';
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

  private resetWidth(): void {
    this.placesWidth = '100%';
    this.dateRangePickerWidth = '100%';
    this.categoryWidth = '100%';
  }

  onPlaceSelected(event): void {
    this.placesWidth = '100%';
  }

  onCategorySelected(event): void {
    this.categoryWidth = '100%';
  }
}
