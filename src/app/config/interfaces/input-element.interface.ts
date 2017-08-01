/**
 * Created by LAE84266 on 31/07/2017.
 */

import { ISimpleElement } from './simple-element.interface';
import { IValidator } from './validator.interface';

export interface IInputElement extends ISimpleElement {
  placeHolder: string;
  validators?: IValidator[];
}
