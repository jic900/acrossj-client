/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IForm } from 'app/config/interfaces/form.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IValidator } from 'app/config/interfaces/validator.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

export class SignUpConfig implements IForm {
  elements: [IInputElement, IInputElement, IInputElement, IInputElement, IElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.SIGNUP.USERNAME',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
        {name: 'maxlength', type: 'builtin', value: 20, error: 'ERRORS.VALIDATION.USER.USERNAME.MAXLENGTH'},
        {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
      ]
    },
    {
      name: 'email',
      type: 'input',
      placeHolder: 'AUTH.SIGNUP.EMAIL',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.EMAIL.REQUIRED'},
        {name: 'pattern', type: 'builtin', value: /.+@.+\..+/i, error: 'ERRORS.VALIDATION.USER.EMAIL.PATTERN'}
      ]
    },
    {
      name: 'password',
      type: 'input',
      placeHolder: 'AUTH.SIGNUP.PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'confirmPassword',
      type: 'input',
      placeHolder: 'AUTH.SIGNUP.CONFIRM_PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'showPassword',
      type: 'checkbox',
      display: 'AUTH.SIGNUP.SHOW_PASSWORD'
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.SIGNUP.BTN_LABEL'
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
      message: {display: 'MESSAGES.AUTH.SIGNUP.SUCCESS', type: 'success', iconClass: 'fa-check-circle'},
      link: {name: 'sendVerifyEmail', display: 'AUTH.SIGNUP.SEND_EMAIL', link: {path: '/auth', param: 'sendverifyemail'}}
    }
  ];
}
