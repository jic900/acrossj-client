/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IForm } from 'app/config/interfaces/form.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

export class SignInConfig implements IForm {
  elements: [IInputElement, IInputElement, IElement, ILinkElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.SIGNIN.USERNAME',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
        {name: 'pattern', type: 'builtin', value: /^[^~!#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
      ]
    },
    {
      name: 'password',
      type: 'input',
      placeHolder: 'AUTH.SIGNIN.PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
      ]
    },
    {
      name: 'showPassword',
      type: 'checkbox',
      display: 'AUTH.SIGNIN.SHOW_PASSWORD'
    },
    {
      name: 'forgotPassword',
      type: 'link',
      display: 'AUTH.SIGNIN.FORGOT_PASSWORD',
      link: {path: '/auth', param: 'forgotpassword'}
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.SIGNIN.BTN_LABEL'
    }
  ];
  messages: IMessageElement[] = [
    {
      name: 'success',
      message: {display: 'MESSAGES.AUTH.SIGNIN.SUCCESS', type: 'success', iconClass: 'fa-check-circle'}
    },
    {
      name: 'invalidUsername',
      message: {display: 'MESSAGES.AUTH.SIGNIN.INVALID_USERNAME', type: 'error', iconClass: 'fa-times-circle'}
    },
    {
      name: 'invalidPassword',
      message: {display: 'MESSAGES.AUTH.SIGNIN.INVALID_PASSWORD', type: 'error', iconClass: 'fa-times-circle'}
    },
    {
      name: 'notVerified',
      message: {display: 'MESSAGES.AUTH.SIGNIN.NOT_VERIFIED', type: 'error', iconClass: 'fa-times-circle'},
      link: {name: 'sendVerifyEmail', display: 'AUTH.SIGNIN.SEND_EMAIL', link: {path: '/auth', param: 'sendverifyemail'}}
    }
  ];
}
