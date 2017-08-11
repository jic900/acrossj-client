/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

export class VerifyEmailConfig implements IComponent {
  elements = [];
  messages: IMessageElement[] = [
    {
      name: 'inProgress',
      message: {display: 'MESSAGES.AUTH.VERIFY_EMAIL.INPROGRESS'},
      navLink: {name: 'backSignIn', display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN', iconClass: 'fa-angle-left', link: {path: '/auth', param: 'signin'}}
    },
    {
      name: 'success',
      message: {display: 'MESSAGES.AUTH.VERIFY_EMAIL.SUCCESS', type: 'success', iconClass: 'fa-check-circle'},
      navLink: {name: 'backSignIn', display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN', iconClass: 'fa-angle-left', link: {path: '/auth', param: 'signin'}}
    },
    {
      name: 'alreadyVerified',
      message: {display: 'MESSAGES.AUTH.VERIFY_EMAIL.ALREADY_VERIFIED', type: 'warning', iconClass: 'fa-exclamation-circle'},
      navLink: {name: 'backSignIn', display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN', iconClass: 'fa-angle-left', link: {path: '/auth', param: 'signin'}}
    },
    {
      name: 'invalidToken',
      message: {display: 'MESSAGES.AUTH.VERIFY_EMAIL.INVALID_TOKEN', type: 'error', iconClass: 'fa-times-circle'},
      link: {name: 'sendVerifyEmail', display: 'AUTH.VERIFY_EMAIL.SEND_EMAIL', link: {path: '/auth', param: 'sendverifyemail'}},
      navLink: {name: 'backSignIn', display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN', iconClass: 'fa-angle-left', link: {path: '/auth', param: 'signin'}}
    }
  ];
}
