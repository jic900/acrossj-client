/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { IDropDownElement } from 'app/config/interfaces/dropdown-element.interface';
import { IDateRangePickerElement } from 'app/config/interfaces/daterangepicker-element.interface';
import { DateRangePickerOptions } from './daterangepickeroptions.config';

export class SearchFieldConfig implements IComponent {
  elements: [IDropDownElement, IDateRangePickerElement, IDropDownElement] = [
    {
      name: 'placeSearcher',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.PLACES.FIELD_INPUT_TXT',
      displayProperty: 'display',
      displayMaxCount: 5,
      sorted: true,
      autoComplete: true
    },
    {
      name: 'dateRangePicker',
      type: 'daterangepicker',
      placeHolder: 'NAVBAR.SEARCH.DRP.INPUT.FIELD_TXT',
      options: DateRangePickerOptions
    },
    {
      name: 'categoryPicker',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.CATEGORY.FIELD_INPUT_TXT',
      displayProperty: 'display'
    }
  ];
}
