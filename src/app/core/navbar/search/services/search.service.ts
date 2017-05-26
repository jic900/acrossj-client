import { Injectable } from '@angular/core';
import { IMenuItem } from '../../../../shared/interfaces/menuitem.interface';
import { AppConfig, CategoryOptions, DateRangePickerOptions } from '../../../../config/app.config';
import { IOptions } from '../../../../shared/components/datepicker/interfaces/options.interface';

@Injectable()
export class SearchService {

  places: string[] = ['Vatican City', 'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland',
    'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', '日本', '中国'];

  placeList: IMenuItem[];
  categoryList: IMenuItem[];
  dateRangePickerOptions: IOptions;
  displayedPlacesMaxCount: number;

  constructor() {
    this.placeList = this.getPlaceList();
    this.categoryList = CategoryOptions;
    this.dateRangePickerOptions = DateRangePickerOptions;
    this.displayedPlacesMaxCount = AppConfig.PLACE_SEARCH_RESULT_LIMIT;
  }

  private getPlaceList(): IMenuItem[] {
    let resultList: IMenuItem[] = [];
    for (const place of this.places) {
      resultList.push({display: place});
    }
    return resultList;
  }

  filterPlaces(filterString: string,
               sourceList: IMenuItem[],
               filterProperty: string,
               maxCount: number): IMenuItem[] {
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
}
