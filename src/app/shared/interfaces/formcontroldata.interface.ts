/**
 * Created by LAE84266 on 21/07/2017.
 */

import { IValidator } from './validator.interface';

export interface IFormControlData {
  controlName: string;
  validators: IValidator[];
  type?: string;
  placeHolder?: string;
}
