/**
 * Created by LAE84266 on 25/07/2017.
 */

export interface IValidator {
  name: string;
  type: string;
  value?: any;
  error: string;
}
// interface IValidatorError {
//   code: string;
//   message: string;
// }

export interface IFormControlData {
  controlName: string;
  validators: IValidator[];
  type?: string;
  placeHolder?: string;
}

export interface IFormControl {
  type: string,
  data: IFormControlData;
}

export interface IFormData {
  labels?: {};
  controls: IFormControl[];
  errors?: {};
  validator?: IValidator;
  asyncValidator?: IValidator;
  successMessage?: string;
}

