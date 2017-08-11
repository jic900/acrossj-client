/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IForm } from 'app/config/interfaces/form.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IValidator } from 'app/config/interfaces/validator.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

export class ResetPasswordConfig implements IForm {
  elements: [IInputElement, IInputElement, IInputElement, IElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.RESET_PASSWORD.USERNAME',
      readOnly: true
    },
    {
      name: 'password',
      type: 'input',
      placeHolder: 'AUTH.RESET_PASSWORD.PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'confirmPassword',
      type: 'input',
      placeHolder: 'AUTH.RESET_PASSWORD.CONFIRM_PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'showPassword',
      type: 'checkbox',
      display: 'AUTH.RESET_PASSWORD.SHOW_PASSWORD'
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.RESET_PASSWORD.BTN_LABEL'
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
      message: {display: 'MESSAGES.AUTH.RESET_PASSWORD.SUCCESS', type: 'success', iconClass: 'fa-check-circle'},
      navLink: {name: 'backSignIn', display: 'AUTH.RESET_PASSWORD.BACK_SIGNIN', iconClass: 'fa-angle-left', link: {path: '/auth', param: 'signin'}}
    },
    {
      name: 'invalidToken',
      message: {display: 'MESSAGES.AUTH.RESET_PASSWORD.INVALID_TOKEN', type: 'error', iconClass: 'fa-times-circle'},
      link: {name: 'sendEmail', display: 'AUTH.RESET_PASSWORD.SEND_EMAIL', link: {path: '/auth', param: 'forgotpassword'}}
    }
  ];
}
