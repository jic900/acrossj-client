/**
 * Created by LAE84266 on 09/06/2017.
 */

import { IComponent } from './interfaces/component.interface';
import { IForm } from './interfaces/form.interface';
import { IElement } from './interfaces/element.interface';
import { ILinkElement } from './interfaces/link-element.interface';
import { IInputElement } from './interfaces/input-element.interface';
import { IValidator } from './interfaces/validator.interface';

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
  messages: {} = {
    success: 'MESSAGES.AUTH.SIGNIN.SUCCESS'
  };
  errors: {} = {
    userNotFound: 'ERRORS.USER.NOTFOUND',
    invalidPassword: 'ERRORS.USER.PASSWORD_MISMATCH'
  };
};

export class SignUpConfig implements IForm {
  elements: [IInputElement, IInputElement, IInputElement, IInputElement, IElement, IElement, ILinkElement] = [
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
    },
    {
      name: 'sendVerifyEmail',
      type: 'link',
      display: 'AUTH.SIGNUP.SEND_EMAIL',
      link: {path: '/auth', param: 'sendverifyemail'}
    }
  ];
  validator: IValidator = {
    name: 'passwordMatch',
    type: 'custom',
    error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
  };
  messages: {} = {
    success: 'MESSAGES.AUTH.SIGNUP.SUCCESS'
  };
};

export class VerifyEmailConfig implements IComponent {
  elements: ILinkElement[] = [
    {
      name: 'sendVerifyEmail',
      type: 'link',
      display: 'AUTH.VERIFY_EMAIL.SEND_EMAIL',
      link: {path: '/auth', param: 'sendverifyemail'}
    },
    {
      name: 'backSignIn',
      type: 'link',
      display: 'AUTH.VERIFY_EMAIL.BACK_SIGNIN',
      link: {path: '/auth', param: 'signin'}
    }
  ];
  messages: {} = {
    inProgress: 'MESSAGES.AUTH.VERIFY_EMAIL.INPROGRESS',
    success: 'MESSAGES.AUTH.VERIFY_EMAIL.SUCCESS',
    alreadyVerified: 'MESSAGES.AUTH.VERIFY_EMAIL.ALREADY_VERIFIED'
  };
  errors: {} = {
    failed: 'ERRORS.VERIFY_EMAIL.FAILED'
  };
};

export class ForgotPasswordConfig implements IForm {
  elements: [IInputElement, IElement, ILinkElement] = [
    {
      name: 'email',
      type: 'input',
      placeHolder: 'AUTH.FORGOT_PASSWORD.EMAIL',
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
    },
    {
      name: 'backSignIn',
      type: 'link',
      display: 'AUTH.FORGOT_PASSWORD.BACK_SIGNIN',
      link: {path: '/auth', param: 'signin'}
    }
  ];
  messages: {} = {
    hint: 'MESSAGES.AUTH.FORGOT_PASSWORD.HINT',
    success: 'MESSAGES.AUTH.FORGOT_PASSWORD.SUCCESS'
  };
  errors: {} = {
    userNotFound: 'ERRORS.FORGOT_PASSWORD.NOTFOUND'
  };
};

export class ResetPasswordConfig implements IForm {
  elements: [IInputElement, IInputElement, IInputElement, IInputElement, IElement, IElement, ILinkElement, ILinkElement] = [
    {
      name: 'username',
      type: 'input',
      placeHolder: 'AUTH.RESET_PASSWORD.USERNAME',
      readOnly: true
    },
    {
      name: 'oldPassword',
      type: 'input',
      placeHolder: 'AUTH.RESET_PASSWORD.OLD_PASSWORD',
      validators: [
        {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.REQUIRED'},
        {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.MINLENGTH'}
      ]
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
    },
    {
      name: 'sendEmail',
      type: 'link',
      display: 'AUTH.RESET_PASSWORD.SEND_EMAIL',
      link: {path: '/auth', param: 'forgotpassword'}
    },
    {
      name: 'backSignIn',
      type: 'link',
      display: 'AUTH.RESET_PASSWORD.BACK_SIGNIN',
      link: {path: '/auth', param: 'signin'}
    }
  ];
  validator: IValidator = {
    name: 'passwordMatch',
    type: 'custom',
    error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
  };
  messages: {} = {
    success: 'MESSAGES.AUTH.RESET_PASSWORD.SUCCESS'
  };
  errors: {} = {
    failed: 'ERRORS.RESET_PASSWORD.FAILED'
  };
};

