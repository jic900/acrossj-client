/**
 * Created by LAE84266 on 10/07/2017.
 */

import { FormControl, Validators } from '@angular/forms';
import { AuthConfig } from 'app/config/auth.config';

export class AuthValidator {

  signinUsername: FormControl;
  signinPassword: FormControl;
  signupUsername: FormControl;
  signupEmail: FormControl;
  signupPassword: FormControl;
  signupConfirmPassword: FormControl;

  constructor() {
    this.signinUsername = new FormControl('', [
      Validators.required,
      Validators.minLength(AuthConfig.validation.signin.username.minLength.rule),
      Validators.pattern(AuthConfig.validation.signin.username.pattern.rule)
    ]);
    this.signinPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(AuthConfig.validation.signin.password.minLength.rule)
    ]);
    this.signupUsername = new FormControl('', [
      Validators.required,
      Validators.minLength(AuthConfig.validation.signup.username.minLength.rule),
      Validators.maxLength(AuthConfig.validation.signup.username.maxLength.rule),
      Validators.pattern(AuthConfig.validation.signup.username.pattern.rule)
    ]);
    this.signupEmail = new FormControl('', [
      Validators.required,
      Validators.pattern(AuthConfig.validation.signup.email.pattern.rule)
    ]);
    this.signupPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(AuthConfig.validation.signup.password.minLength.rule)
    ]);
    this.signupConfirmPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(AuthConfig.validation.signup.confirmPassword.minLength.rule)
    ]);
  }
}
