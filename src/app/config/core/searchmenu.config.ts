/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IDropDownElement } from 'app/config/interfaces/dropdown-element.interface';
import { IDateRangePickerElement } from 'app/config/interfaces/daterangepicker-element.interface';
import { DateRangePickerOptions } from './daterangepickeroptions.config';

export class SearchMenuConfig implements IComponent {
  elements: [IElement, IDropDownElement, IDateRangePickerElement, IDropDownElement, IElement] = [
    {
      name: 'title',
      type: 'label',
      display: 'NAVBAR.SEARCH.TITLE'
    },
    {
      name: 'placeSearcher',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.PLACES.MENU_INPUT_TXT',
      displayProperty: 'display',
      displayMaxCount: 5,
      sorted: true,
      autoComplete: true
    },
    {
      name: 'dateRangePicker',
      type: 'daterangepicker',
      placeHolder: 'NAVBAR.SEARCH.DRP.INPUT.MENU_TXT',
      options: DateRangePickerOptions
    },
    {
      name: 'categoryPicker',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.CATEGORY.MENU_INPUT_TXT',
      displayProperty: 'display'
    },
    {
      name: 'clearAll',
      type: 'button',
      display: 'NAVBAR.SEARCH.CLEAR_ALL'
    }
  ];
}
