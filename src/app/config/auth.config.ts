/**
 * Created by LAE84266 on 09/06/2017.
 */

export const AuthConfig = {
  signin: {
    label: 'AUTH.SIGNIN.LABEL',
    username: {
      controlName: 'username',
      placeHolder: 'AUTH.SIGNIN.USERNAME'
    },
    password: {
      controlName: 'password',
      placeHolder: 'AUTH.SIGNIN.PASSWORD'
    },
    showPassword: {
      label: 'AUTH.SIGNIN.SHOW_PASSWORD'
    },
    forgotPassword: {
      label: 'AUTH.SIGNIN.FORGOT_PASSWORD'
    },
    submitButton: {
      label: 'AUTH.SIGNIN.BTN_LABEL'
    },
    formGroup: [
      {
        type: 'control',
        name: 'username',
        validators: [
          {name: 'required', type: 'builtin'},
          {name: 'minlength', type: 'builtin', value: 2},
          {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/}
        ]
      },
      {
        type: 'control',
        name: 'password',
        validators: [
          {name: 'required', type: 'builtin'},
          {name: 'minlength', type: 'builtin', value: 4}
        ]
      },
    ],
    errors: {
      username: [
        {code: 'required', message: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
        {code: 'minlength', message: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
        {code: 'pattern', message: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
      ],
      password: [
        {code: 'required', message: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
        {code: 'minlength', message: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
      ]
    }
  },
  signup: {
    label: 'AUTH.SIGNUP.LABEL',
    username: {
      controlName: 'username',
      placeHolder: 'AUTH.SIGNUP.USERNAME'
    },
    email: {
      controlName: 'email',
      placeHolder: 'AUTH.SIGNUP.EMAIL'
    },
    password: {
      controlName: 'password',
      placeHolder: 'AUTH.SIGNUP.PASSWORD'
    },
    confirmPassword: {
      controlName: 'confirmPassword',
      placeHolder: 'AUTH.SIGNUP.CONFIRM_PASSWORD'
    },
    showPassword: {
      label: 'AUTH.SIGNUP.SHOW_PASSWORD'
    },
    submitButton: {
      label: 'AUTH.SIGNUP.BTN_LABEL'
    },
    formGroup: [
      {
        type: 'control',
        name: 'username',
        validators: [
          {name: 'required', type: 'builtin'},
          {name: 'minlength', type: 'builtin', value: 2},
          {name: 'maxlength', type: 'builtin', value: 20},
          {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/}
        ]
      },
      {
        type: 'control',
        name: 'email',
        validators: [
          {name: 'required', type: 'builtin'},
          {name: 'pattern', type: 'builtin', value: /.+@.+\..+/i}
        ]
      },
      {
        type: 'control',
        name: 'password',
        validators: [
          {name: 'required', type: 'builtin'},
          {name: 'minlength', type: 'builtin', value: 4},
        ]
      },
      {
        type: 'control',
        name: 'confirmPassword',
        validators: [
          {name: 'required', type: 'builtin'},
          {name: 'minlength', type: 'builtin', value: 4},
        ]
      },
      {
        type: 'validator',
        name: 'passwordMatch'
      }
    ],
    errors: {
      username: [
        {code: 'required', message: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
        {code: 'minlength', message: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
        {code: 'maxlength', message: 'ERRORS.VALIDATION.USER.USERNAME.MAXLENGTH'},
        {code: 'pattern', message: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
      ],
      email: [
        {code: 'required', message: 'ERRORS.VALIDATION.USER.EMAIL.REQUIRED'},
        {code: 'pattern', message: 'ERRORS.VALIDATION.USER.EMAIL.PATTERN'}
      ],
      password: [
        {code: 'required', message: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
        {code: 'minlength', message: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'},
        {code: 'passwordMatch', message: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'}
      ],
      confirmPassword: [
        {code: 'required', message: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'},
        {code: 'minlength', message: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'},
        {code: 'passwordMatch', message: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'}
]
    }
  }
};
