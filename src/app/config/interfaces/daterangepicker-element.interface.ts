/**
 * Created by LAE84266 on 01/08/2017.
 */

import { IInputElement } from './input-element.interface';
import { IOptions } from 'app/shared/components/daterangepicker/interfaces/options.interface';

export interface IDateRangePickerElement extends IInputElement {
  options: IOptions;
}
