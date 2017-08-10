/**
 * Created by LAE84266 on 06/08/2017.
 */

import { IForm } from './interfaces/form.interface';
import { IElement } from './interfaces/element.interface';
import { IInputElement } from './interfaces/input-element.interface';
import { IValidator } from './interfaces/validator.interface';
import { IMessageElement } from './interfaces/message-element';

export class ChangePasswordConfig implements IForm {
  elements: [IInputElement, IInputElement, IInputElement, IElement, IElement] = [
    {
      name: 'oldPassword',
      type: 'input',
      placeHolder: 'USER.PROFILE.CHANGE_PASSWORD.OLD_PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'password',
      type: 'input',
      placeHolder: 'USER.PROFILE.CHANGE_PASSWORD.PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'confirmPassword',
      type: 'input',
      placeHolder: 'USER.PROFILE.CHANGE_PASSWORD.CONFIRM_PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'showPassword',
      type: 'checkbox',
      display: 'USER.PROFILE.CHANGE_PASSWORD.SHOW_PASSWORD'
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'USER.PROFILE.CHANGE_PASSWORD.BTN_LABEL'
    }
  ];
  validator: IValidator = {
    name: 'passwordMatch',
    type: 'custom',
    error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
  };
  messages: IMessageElement[] = [
    {
      name: 'success',
      message: {display: 'MESSAGES.USER.PROFILE.CHANGE_PASSWORD.SUCCESS', type: 'success', iconClass: 'fa-check-circle'}
    },
    {
      name: 'invalidPassword',
      message: {display: 'MESSAGES.USER.PROFILE.PERSONAL_INFO.CHANGE_PASSWORD.INVALID_PASSWORD', type: 'error', iconClass: 'fa-times-circle'}
    },
    {
      name: 'samePassword',
      message: {display: 'MESSAGES.USER.PROFILE.PERSONAL_INFO.CHANGE_PASSWORD.SAME_PASSWORD', type: 'error', iconClass: 'fa-times-circle'}
    }
  ];
};
