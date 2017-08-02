import { Injectable } from '@angular/core';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

@Injectable()
export class SearchService {

  places: string[] = ['Vatican City', 'Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium',
    'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland',
    'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands',
    'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia',
    'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', '日本', '中国'];

  placeList: ILinkElement[];
  categoryList: ILinkElement[] = [
    {name: 'skii', display: 'Skii', link: null},
    {name: 'bicycling', display: 'Bicycling', iconClass: 'fa fa-bicycle', link: {path: '/'}},
    {name: 'hiking', display: 'Hiking', link: null},
    {name: 'other', display: 'Other', link: null}
  ];

  constructor() {
    this.placeList = this.getPlaceList();
  }

  private getPlaceList(): ILinkElement[] {
    let resultList: ILinkElement[] = [];
    for (const place of this.places) {
      resultList.push({name: place, display: place, link: null});
    }
    return resultList;
  }

  filterPlaces(filterString: string,
               sourceList: ILinkElement[],
               filterProperty: string,
               maxCount: number): ILinkElement[] {
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
