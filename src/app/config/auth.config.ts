/**
 * Created by LAE84266 on 09/06/2017.
 */

import { IComponent } from './interfaces/component.interface';
import { IForm } from './interfaces/form.interface';
import { IElement } from './interfaces/element.interface';
import { ILinkElement } from './interfaces/link-element.interface';
import { IInputElement } from './interfaces/input-element.interface';
import { IValidator } from './interfaces/validator.interface';
import { IMessageElement } from './interfaces/message-element';

export class AuthConfig implements IComponent {
  elements: IElement[] = [
    {
      name: 'signin',
      type: 'label',
      display: 'AUTH.SIGNIN.LABEL'
    },
    {
      name: 'signup',
      type: 'label',
      display: 'AUTH.SIGNUP.LABEL'
    },
    {
      name: 'verifyEmail',
      type: 'label',
      display: 'AUTH.VERIFY_EMAIL.LABEL'
    },
    {
      name: 'sendVerifyEmail',
      type: 'label',
      display: 'AUTH.SEND_VERIFY_EMAIL.LABEL'
    },
    {
      name: 'forgotPassword',
      type: 'label',
      display: 'AUTH.FORGOT_PASSWORD.LABEL'
    },
    {
      name: 'resetPassword',
      type: 'label',
      display: 'AUTH.RESET_PASSWORD.LABEL'
    }
  ]
}

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
};

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
};

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
};

export class SendVerifyEmailConfig implements IForm {
  elements: [IInputElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.SEND_VERIFY_EMAIL.USERNAME',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
        {name: 'pattern', type: 'builtin', value: /^[^~!#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
      ]
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.SEND_VERIFY_EMAIL.BTN_LABEL'
    }
  ];
  messages: IMessageElement[] = [
    {
      name: 'hint',
      message: {display: 'MESSAGES.AUTH.SEND_VERIFY_EMAIL.HINT'}
    },
    {
      name: 'success',
      message: {display: 'MESSAGES.AUTH.SEND_VERIFY_EMAIL.SUCCESS', type: 'success', iconClass: 'fa-check-circle'},
      navLink: {name: 'backSignIn', display: 'AUTH.SEND_VERIFY_EMAIL.BACK_SIGNIN', iconClass: 'fa-angle-left', link: {path: '/auth', param: 'signin'}}
    },
    {
      name: 'invalidUsername',
      message: {display: 'MESSAGES.AUTH.SEND_VERIFY_EMAIL.INVALID_USERNAME', type: 'error', iconClass: 'fa-times-circle'}
    }
  ];
};

export class ForgotPasswordConfig implements IForm {
  elements: [IInputElement, IElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.FORGOT_PASSWORD.USERNAME',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
        {name: 'pattern', type: 'builtin', value: /^[^~!#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
      ]
    },
    {
      name: 'submitButton',
      type: 'button',
      display: 'AUTH.FORGOT_PASSWORD.BTN_LABEL'
    }
  ];
  messages: IMessageElement[] = [
    {
      name: 'hint',
      message: {display: 'MESSAGES.AUTH.FORGOT_PASSWORD.HINT'}
    },
    {
      name: 'success',
      message: {display: 'MESSAGES.AUTH.FORGOT_PASSWORD.SUCCESS', type: 'success', iconClass: 'fa-check-circle'},
      navLink: {name: 'backSignIn', display: 'AUTH.FORGOT_PASSWORD.BACK_SIGNIN', iconClass: 'fa-angle-left', link: {path: '/auth', param: 'signin'}}
    },
    {
      name: 'invalidUsername',
      message: {display: 'MESSAGES.AUTH.FORGOT_PASSWORD.INVALID_USERNAME', type: 'error', iconClass: 'fa-times-circle'}
    }
  ];
};

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
    },
    {
      name: 'invalidUsername',
      message: {display: 'MESSAGES.AUTH.RESET_PASSWORD.INVALID_USERNAME', type: 'error', iconClass: 'fa-times-circle'},
      link: {name: 'sendEmail', display: 'AUTH.RESET_PASSWORD.SEND_EMAIL', link: {path: '/auth', param: 'forgotpassword'}}
    }
  ];
};

