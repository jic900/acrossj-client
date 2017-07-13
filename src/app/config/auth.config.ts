/**
 * Created by LAE84266 on 09/06/2017.
 */

export const AuthConfig = {
  signin: {
    label: 'AUTH.SIGNIN.LABEL',
    username: 'AUTH.SIGNIN.EMAIL_USERNAME',
    password: 'AUTH.SIGNIN.PASSWORD',
    showPassword: 'AUTH.SIGNIN.SHOW_PASSWORD',
    forgotPassword: 'AUTH.SIGNIN.FORGOT_PASSWORD',
    btnLabel: 'AUTH.SIGNIN.BTN_LABEL'
  },
  signup: {
    label: 'AUTH.SIGNUP.LABEL',
    username: 'AUTH.SIGNUP.USERNAME',
    email: 'AUTH.SIGNUP.EMAIL',
    password: 'AUTH.SIGNUP.PASSWORD',
    confirmPassword: 'AUTH.SIGNUP.CONFIRM_PASSWORD',
    showPassword: 'AUTH.SIGNUP.SHOW_PASSWORD',
    btnLabel: 'AUTH.SIGNUP.BTN_LABEL'
  },
  validation: {
    signin: {
      username: {
        required: {
          error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'
        },
        minLength: {
          rule: 2,
          error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'
        },
        pattern: {
          rule: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/,
          error: 'ERRORS.VALIDATION.USER.USERNAME.MATCH'
        }
      },
      password: {
        required: {
          error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'
        },
        minLength: {
          rule: 4,
          error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'
        }
      }
    },
    signup: {
      username: {
        required: {
          error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'
        },
        minLength: {
          rule: 2,
          error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'
        },
        maxLength: {
          rule: 20,
          error: 'ERRORS.VALIDATION.USER.USERNAME.MAXLENGTH'
        },
        pattern: {
          rule: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/,
          error: 'ERRORS.VALIDATION.USER.USERNAME.MATCH'
        }
      },
      email: {
        required: {
          error: 'ERRORS.VALIDATION.USER.EMAIL.REQUIRED'
        },
        pattern: {
          rule: /.+@.+\..+/i,
          error: 'ERRORS.VALIDATION.USER.EMAIL.MATCH'
        }
      },
      password: {
        required: {
          error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'
        },
        minLength: {
          rule: 4,
          error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'
        }
      },
      confirmPassword: {
        required: {
          error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'
        },
        minLength: {
          rule: 4,
          error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'
        }
      },
      passwordMatch: {
        error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
      }
    }
  }
};
