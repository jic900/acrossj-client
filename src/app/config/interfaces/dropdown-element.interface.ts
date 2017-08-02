/**
 * Created by LAE84266 on 01/08/2017.
 */

import { IInputElement } from './input-element.interface';

export interface IDropDownElement extends IInputElement {
  displayProperty: string,
  displayMaxCount?: number,
  sorted?: boolean,
  autoComplete?: boolean
}
