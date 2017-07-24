import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFormControlData } from 'app/shared/interfaces/formcontroldata.interface';
import { IValidator } from 'app/shared/interfaces/validator.interface';

@Component({
  selector: 'aj-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {

  @Input() inputData: IFormControlData;
  @Input() type: string;
  @Input() customValidators: {};
  @Input() formValidateData: {};
  @Output() bindControl: EventEmitter<{}>;
  formControl: FormControl;

  constructor() {
    this.bindControl = new EventEmitter<{}>();
  }

  ngOnInit() {
    this.generateFormControl(this.inputData.validators, this.customValidators);
  }

  generateFormControl(controlValidators: IValidator[], customValidators: {}): void{
    let validators = [];
    let asyncValidators = [];
    controlValidators.forEach(validator => {
      if (validator.type === 'builtin') {
        validators.push(this.getBuiltinValidator(validator));
      } else if (validator.type === 'custom') {
        validators.push(customValidators[validator.name]);
      } else if (validator.type === 'customAsync') {
        asyncValidators.push(customValidators[validator.name]);
      }
    });
    this.formControl = new FormControl('', validators, asyncValidators);
    this.bindControl.emit({'name': this.inputData.controlName, 'control': this.formControl});
  }

  getBuiltinValidator(validator: IValidator): Function {
    switch (validator.name) {
      case 'required':
        return Validators.required;
      case 'minlength':
        return Validators.minLength(validator.value);
      case 'maxlength':
        return Validators.maxLength(validator.value);
      case 'pattern':
        return Validators.pattern(validator.value);
    }
  }

  getValidatorError(): string {
    for (const validator of this.inputData.validators) {
      if (this.formControl.hasError(validator.name)) {
        return validator.error;
      }
    }
    return null;
  }

  validateFailed(): boolean {
    return this.formControl.invalid && this.formControl.touched;
  }

  formValidateFailed(): boolean {
    if (this.formValidateData) {
      return this.formControl.valid && this.formValidateData['validateFailed']() && this.formControl.touched;
    }
    return false;
  }
}
