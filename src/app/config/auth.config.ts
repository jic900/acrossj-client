/**
 * Created by LAE84266 on 09/06/2017.
 */

export const AuthConfig = {
  signin: {
    labels: {
      form: 'AUTH.SIGNIN.LABEL',
      showPassword: 'AUTH.SIGNIN.SHOW_PASSWORD',
      forgotPassword: 'AUTH.SIGNIN.FORGOT_PASSWORD',
      submitButton: 'AUTH.SIGNIN.BTN_LABEL'
    },
    controls: [
      {
        type: 'input',
        data: {
          controlName: 'username',
          type: 'text',
          placeHolder: 'AUTH.SIGNIN.USERNAME',
          validators: [
            {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
            {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
            {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
          ]
        }
      },
      {
        type: 'input',
        data: {
          controlName: 'password',
          type: 'password',
          placeHolder: 'AUTH.SIGNIN.PASSWORD',
          validators: [
            {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
            {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
          ]
        }
      }
    ],
    errors: {
      userNotFound: 'ERRORS.USER.NOTFOUND',
      invalidPassword: 'ERRORS.USER.PASSWORD_MISMATCH'
    }
  },
  signup: {
    labels: {
      form: 'AUTH.SIGNUP.LABEL',
      showPassword: 'AUTH.SIGNUP.SHOW_PASSWORD',
      submitButton: 'AUTH.SIGNUP.BTN_LABEL',
      resendEmail: 'AUTH.SIGNUP.RESEND_EMAIL'
    },
    controls: [
      {
        type: 'input',
        data: {
          controlName: 'username',
          type: 'text',
          placeHolder: 'AUTH.SIGNUP.USERNAME',
          validators: [
            {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.USERNAME.REQUIRED'},
            {name: 'minlength', type: 'builtin', value: 2, error: 'ERRORS.VALIDATION.USER.USERNAME.MINLENGTH'},
            {name: 'maxlength', type: 'builtin', value: 20, error: 'ERRORS.VALIDATION.USER.USERNAME.MAXLENGTH'},
            {name: 'pattern', type: 'builtin', value: /^[^~!@#$%^&*()+`{}|\[\]\\:";'<>?,\/]*$/, error: 'ERRORS.VALIDATION.USER.USERNAME.PATTERN'}
          ]
        }
      },
      {
        type: 'input',
        data: {
          controlName: 'email',
          type: 'text',
          placeHolder: 'AUTH.SIGNUP.EMAIL',
          validators: [
            {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.EMAIL.REQUIRED'},
            {name: 'pattern', type: 'builtin', value: /.+@.+\..+/i, error: 'ERRORS.VALIDATION.USER.EMAIL.PATTERN'}
          ]
        }
      },
      {
        type: 'input',
        data: {
          controlName: 'password',
          type: 'password',
          placeHolder: 'AUTH.SIGNUP.PASSWORD',
          validators: [
            {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.PASSWORD.REQUIRED'},
            {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.PASSWORD.MINLENGTH'}
          ]
        }
      },
      {
        type: 'input',
        data: {
          controlName: 'confirmPassword',
          type: 'password',
          placeHolder: 'AUTH.SIGNUP.CONFIRM_PASSWORD',
          validators: [
            {name: 'required', type: 'builtin', error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.REQUIRED'},
            {name: 'minlength', type: 'builtin', value: 4, error: 'ERRORS.VALIDATION.USER.CONFIRM_PASSWORD.MINLENGTH'}
          ]
        }
      },
    ],
    validator: {
      name: 'passwordMatch',
      type: 'custom',
      error: 'ERRORS.VALIDATION.USER.PASSWORD_MATCH'
    },
    successMessage: 'MESSAGES.AUTH.SIGNUP_SUCCESS'
  },
  verifyEmail: {
    resendEmail: 'AUTH.SIGNUP.RESEND_EMAIL',
    messages: {
      inProgress: 'MESSAGES.AUTH.VERIFY_EMAIL.INPROGRESS',
      success: 'MESSAGES.AUTH.VERIFY_EMAIL.SUCCESS',
      alreadyVerified: 'MESSAGES.AUTH.VERIFY_EMAIL.ALREADY_VERIFIED',
      failed: 'ERRORS.VERIFY_EMAIL.FAILED'
    }
  }
};
