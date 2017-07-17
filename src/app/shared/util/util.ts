/**
 * Created by qiz264 on 2017-04-20.
 */

import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

export class Util {

  private static PLATFORM_IOS_PATTERN = /(iPhone|iPad)/i;
  private static APPVERSION_IOS_PATTERN = /(iPhone|iPad)/i;
  private static PLATFORM_ANDROID_PATTERN = /(Linux armv)/i;
  private static APPVERSION_ANDROID_PATTERN = /(Android)/i;
  private static USERAGENT_ANDROID_PATTERN = /(Android)/i;

  public static deviceType() {
    if (window.navigator.platform.match(this.PLATFORM_IOS_PATTERN)) {
      return 'ios';
    } else if (window.navigator.platform.match(this.PLATFORM_ANDROID_PATTERN) ||
      window.navigator.userAgent.match(this.USERAGENT_ANDROID_PATTERN)) {
      return 'android';
    } else {
      return 'desktop';
    }
  }

  public static isDeviceSimulator() {
    if ((window.navigator.appVersion.match(this.APPVERSION_IOS_PATTERN) && !window.navigator.platform.match(this.PLATFORM_IOS_PATTERN)) ||
      (window.navigator.appVersion.match(this.APPVERSION_ANDROID_PATTERN) && !window.navigator.platform.match(this.PLATFORM_ANDROID_PATTERN))) {
      return true;
    }
  }

  public static isPhoneOrTablet(): boolean {
    if (window.navigator.platform.match(this.PLATFORM_IOS_PATTERN) ||
        window.navigator.platform.match(this.PLATFORM_ANDROID_PATTERN) ||
        window.navigator.userAgent.match(this.USERAGENT_ANDROID_PATTERN) ||
        window.navigator.appVersion.match(this.APPVERSION_IOS_PATTERN) ||
        window.navigator.appVersion.match(this.APPVERSION_ANDROID_PATTERN)) {
      return true;
    }
  }

  public static sortByProperty(prop: string) {
    return (a, b) =>
      a[prop].toLowerCase() !== b[prop].toLowerCase() ? a[prop].toLowerCase() < b[prop].toLowerCase() ? -1 : 1 : 0;
  }

  public static createFormGroup(formGroupConfig: any[], customValidators: {}): FormGroup {
    let controls = {};
    let groupValidator = null;
    let groupAsyncValidator = null;
    for (const groupItem of formGroupConfig) {
      if (groupItem.type === 'control') {
        controls[groupItem.name] = Util.createFormControl(groupItem.validators, customValidators);
      } else if (groupItem.type === 'validator') {
        groupValidator = customValidators[groupItem.name];
      } else if (groupItem.type === 'asyncValidator') {
        groupAsyncValidator = customValidators[groupItem.name];
      }
    }
    return new FormGroup(controls, groupValidator, groupAsyncValidator);
  }

  public static getValidationError(formControl: AbstractControl, errors: any[]): string {
    for (const error of errors) {
      if (formControl.hasError(error.code)) {
        return error.message;
      }
    }
    return null;
  }

  private static createFormControl(controlValidators: any[], customValidators: {}): FormControl {
    let validators = [];
    let asyncValidators = [];
    for (const validator of controlValidators) {
      if (validator.type === 'builtin') {
        validators.push(Util.getBuiltinValidator(validator));
      } else if (validator.type === 'custom') {
        validators.push(customValidators[validator.name]);
      } else if (validator.type === 'customAsync') {
        asyncValidators.push(customValidators[validator.name]);
      }
    }
    return new FormControl('', validators, asyncValidators);
  }

  private static getBuiltinValidator(validatorData: {}): Function {
    if (validatorData['name'] === 'required') {
      return Validators.required;
    } else if (validatorData['name'] === 'minlength') {
      return Validators.minLength(validatorData['value']);
    } else if (validatorData['name'] === 'maxlength') {
      return Validators.maxLength(validatorData['value']);
    } else if (validatorData['name'] === 'pattern') {
      return Validators.pattern(validatorData['value']);
    }
  }
}
