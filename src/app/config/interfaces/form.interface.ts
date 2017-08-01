/**
 * Created by LAE84266 on 31/07/2017.
 */

import { ISimpleComponent } from './simple-component.interface';
import { IValidator } from './validator.interface';

export interface IForm extends ISimpleComponent {
  validator?: IValidator;
  asyncValidator?: IValidator;
}
