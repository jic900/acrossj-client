/**
 * Created by LAE84266 on 09/06/2017.
 */

export const AuthConfig = {
  signin: {
    title: 'AUTH.SIGNIN.LABEL',
    elements: [
      {
        name: 'username',
        type: 'input',
        placeHolder: 'AUTH.SIGNIN.USERNAME',
        validators: [
          {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
          {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
          {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
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
        link: {path: 'auth', param: 'forgotpassword'}
      },
      {
        name: 'submitButton',
        type: 'button',
        display: 'AUTH.SIGNIN.BTN_LABEL'
      }
    ],
    messages: {
      success: 'MESSAGES.AUTH.SIGNIN.SUCCESS'
    },
    errors: {
      userNotFound: 'ERRORS.USER.NOTFOUND',
      invalidPassword: 'ERRORS.USER.PASSWORD_MISMATCH'
    }
  },
  signup: {
    title: 'AUTH.SIGNUP.LABEL',
    elements: [
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
        link: {path: 'auth', param: 'sendverifyemail'}
      }
    ],
    validator: {
      name: 'passwordMatch',
      type: 'custom',
      error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
    },
    messages: {
      success: 'MESSAGES.AUTH.SIGNUP.SUCCESS'
    }

  },
  verifyEmail: {
    title: '',
    elements: [
      {
        name: 'sendVerifyEmail',
        type: 'link',
        display: 'AUTH.VERIFY_EMAIL.SEND_EMAIL',
        link: {path: 'auth', param: 'sendverifyemail'}
      }
    ],
    messages: {
      inProgress: 'MESSAGES.AUTH.VERIFY_EMAIL.INPROGRESS',
      success: 'MESSAGES.AUTH.VERIFY_EMAIL.SUCCESS',
      alreadyVerified: 'MESSAGES.AUTH.VERIFY_EMAIL.ALREADY_VERIFIED'
    },
    errors: {
      failed: 'ERRORS.VERIFY_EMAIL.FAILED'
    }
  },
  forgotPassword: {
    title: 'AUTH.FORGOT_PASSWORD.LABEL',
    elements: [
      {
        name: 'email',
        type: 'input',
        placeHolder: 'AUTH.FORGOT_PASSWORD.EMAIL',
        validators: [
          {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.EMAIL.REQUIRED'},
          {name: 'pattern', type: 'builtin', value: /.+@.+\..+/i, error: 'ERRORS.VALIDATION.USER.EMAIL.PATTERN'}
        ]
      },
      {
        name: 'submitButton',
        type: 'button',
        display: 'AUTH.FORGOT_PASSWORD.BTN_LABEL'
      }
    ],
    messages: {
      success: 'MESSAGES.AUTH.FORGOT_PASSWORD.SUCCESS'
    }
  },
  resetPassword: {
    title: 'AUTH.RESET_PASSWORD.LABEL',
    elements: [
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
    ],
    validator: {
      name: 'passwordMatch',
      type: 'custom',
      error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
    },
    messages: {
      success: 'MESSAGES.AUTH.RESET_PASSWORD.SUCCESS'
    }
  }
  // signin: {
  //   labels: {
  //     form: 'AUTH.SIGNIN.LABEL',
  //     showPassword: 'AUTH.SIGNIN.SHOW_PASSWORD',
  //     forgotPassword: 'AUTH.SIGNIN.FORGOT_PASSWORD',
  //     submitButton: 'AUTH.SIGNIN.BTN_LABEL'
  //   },
  //   controls: [
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'username',
  //         type: 'text',
  //         placeHolder: 'AUTH.SIGNIN.USERNAME',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
  //           {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
  //         ]
  //       }
  //     },
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'password',
  //         type: 'password',
  //         placeHolder: 'AUTH.SIGNIN.PASSWORD',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
  //         ]
  //       }
  //     }
  //   ],
  //   errors: {
  //     userNotFound: 'ERRORS.USER.NOTFOUND',
  //     invalidPassword: 'ERRORS.USER.PASSWORD_MISMATCH'
  //   }
  // },
  // signup: {
  //   labels: {
  //     form: 'AUTH.SIGNUP.LABEL',
  //     showPassword: 'AUTH.SIGNUP.SHOW_PASSWORD',
  //     submitButton: 'AUTH.SIGNUP.BTN_LABEL',
  //     resendEmail: 'AUTH.SIGNUP.RESEND_EMAIL'
  //   },
  //   controls: [
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'username',
  //         type: 'text',
  //         placeHolder: 'AUTH.SIGNUP.USERNAME',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
  //           {name: 'maxlength', type: 'builtin', value: 20, error: 'ERRORS.VALIDATION.USER.USERNAME.MAXLENGTH'},
  //           {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
  //         ]
  //       }
  //     },
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'email',
  //         type: 'text',
  //         placeHolder: 'AUTH.SIGNUP.EMAIL',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.EMAIL.REQUIRED'},
  //           {name: 'pattern', type: 'builtin', value: /.+@.+\..+/i, error: 'ERRORS.VALIDATION.USER.EMAIL.PATTERN'}
  //         ]
  //       }
  //     },
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'password',
  //         type: 'password',
  //         placeHolder: 'AUTH.SIGNUP.PASSWORD',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
  //         ]
  //       }
  //     },
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'confirmPassword',
  //         type: 'password',
  //         placeHolder: 'AUTH.SIGNUP.CONFIRM_PASSWORD',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'}
  //         ]
  //       }
  //     },
  //   ],
  //   validator: {
  //     name: 'passwordMatch',
  //     type: 'custom',
  //     error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
  //   },
  //   messages: {
  //     success: 'MESSAGES.AUTH.SIGNUP.SUCCESS'
  //   }
  // },
  // verifyEmail: {
  //   sendEmail: 'AUTH.VERIFY_EMAIL.SEND_EMAIL',
  //   messages: {
  //     inProgress: 'MESSAGES.AUTH.VERIFY_EMAIL.INPROGRESS',
  //     success: 'MESSAGES.AUTH.VERIFY_EMAIL.SUCCESS',
  //     alreadyVerified: 'MESSAGES.AUTH.VERIFY_EMAIL.ALREADY_VERIFIED',
  //     failed: 'ERRORS.VERIFY_EMAIL.FAILED'
  //   }
  // },
  // forgotPassword: {
  //   labels: {
  //     form: 'AUTH.FORGOT_PASSWORD.LABEL',
  //     submitButton: 'AUTH.FORGOT_PASSWORD.BTN_LABEL',
  //   },
  //   controls: [
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'email',
  //         type: 'text',
  //         placeHolder: 'AUTH.FORGOT_PASSWORD.EMAIL',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.EMAIL.REQUIRED'},
  //           {name: 'pattern', type: 'builtin', value: /.+@.+\..+/i, error: 'ERRORS.VALIDATION.USER.EMAIL.PATTERN'}
  //         ]
  //       }
  //     }
  //   ],
  //   messages: {
  //     success: 'MESSAGES.AUTH.FORGOT_PASSWORD.SUCCESS'
  //   }
  // },
  // resetPassword: {
  //   labels: {
  //     form: 'AUTH.RESET_PASSWORD.LABEL',
  //     showPassword: 'AUTH.RESET_PASSWORD.SHOW_PASSWORD',
  //     submitButton: 'AUTH.RESET_PASSWORD.BTN_LABEL'
  //   },
  //   controls: [
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'oldPassword',
  //         type: 'password',
  //         placeHolder: 'AUTH.RESET_PASSWORD.OLD_PASSWORD',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.OLD_PASSWORD.MINLENGTH'}
  //         ]
  //       }
  //     },
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'password',
  //         type: 'password',
  //         placeHolder: 'AUTH.RESET_PASSWORD.PASSWORD',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
  //         ]
  //       }
  //     },
  //     {
  //       type: 'input',
  //       data: {
  //         controlName: 'confirmPassword',
  //         type: 'password',
  //         placeHolder: 'AUTH.RESET_PASSWORD.CONFIRM_PASSWORD',
  //         validators: [
  //           {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'},
  //           {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'}
  //         ]
  //       }
  //     },
  //   ],
  //   messages: {
  //     success: 'MESSAGES.AUTH.RESET_PASSWORD.SUCCESS'
  //   }
  // }
};
