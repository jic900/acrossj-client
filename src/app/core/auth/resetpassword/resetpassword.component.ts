import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { ResetPasswordConfig } from 'app/config/auth.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

interface IResetPassword {
  username: IInputElement;
  oldPassword: IInputElement;
  password: IInputElement;
  confirmPassword: IInputElement;
  showPassword: IElement;
  submitButton: IElement;
  sendEmail: ILinkElement;
  backSignIn: ILinkElement;
}

@Component({
  selector: 'aj-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['../auth.component.css']
})

export class ResetPasswordComponent {

  formData: IForm;
  formElements: IResetPassword;
  inputElements: IInputElement[];
  @ViewChild('form') form;
  formGroup: FormGroup;
  passwordType: string;
  processing: boolean;
  success: boolean;
  message: string;
  showResendLink: boolean;
  token: string;
  jwtHelper: JwtHelper;

  constructor(private authService: AuthService) {
    this.formData = new ResetPasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      if (authService.authenticated) {
        return element.type === 'input';
      } else {
        return element.type === 'input' && element.name !== 'oldPassword';
      }
    });
    this.passwordType = 'password';
    this.message = null;
    this.success = false;
    this.processing = false;
    this.showResendLink = false;
    this.formGroup = new FormGroup({}, this.passwordMatch);
    this.jwtHelper = new JwtHelper();
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;;
  }

  setToken(token: string): void {
    this.token = token;
    let decodedToken;
    try {
      decodedToken = this.jwtHelper.decodeToken(token);
    } catch (e) {}
    if (!decodedToken) {
      this.message = this.formData.errors['failed'];
      this.showResendLink = true;
    } else {
      this.formGroup.get('username').setValue(decodedToken.username);
    }
  }

  onClicked(event): void {
    this.message = null;
  }

  passwordMatch(formGroup: FormGroup): {} {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      return passwordControl.value === confirmPasswordControl.value ? null : {'passwordMatch': true};
    }
  }

  getFormValidateData(controlName: string) {
    if (controlName === 'confirmPassword') {
      return {'validateFailed': this.formValidateFailed, 'error': this.getFormValidateError};
    }
    return null;
  }

  formValidateFailed = () => {
    return this.formGroup.hasError('passwordMatch');
  }

  getFormValidateError = () => {
    return this.formData.validator.error;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onResetPassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;
    let requestData = {
      token: this.token,
      newPassword: this.formGroup.value.password
    };
    if (this.authService.authenticated) {
      requestData['currentPassword'] = this.formGroup.value.oldPassword;
    }
    this.authService.resetPassword(requestData)
      .subscribe(
        data => {
          this.message = this.formData.messages['success'];
          this.success = true;
        },
        err => {
          if (err.name === 'TokenExpired' || err.name === 'InvalidToken' || err.name === 'VerifyToken') {
            this.message = this.formData.errors['failed'];
            this.showResendLink = true;
          } else if (err.name === 'UserNotFound') {
            this.message = this.formData.errors['userNotFound'];
            this.showResendLink = true;
          } else {
            if (err.name === 'InvalidPassword') {
              this.message = this.formData.errors['invalidPassword'];
            } else if (err.name === 'SamePassword') {
              this.message = this.formData.errors['samePassword'];
            } else {
              this.message = err.message;
            }
            this.form.resetForm();
            const decodedToken = this.jwtHelper.decodeToken(this.token);
            this.formGroup.get('username').setValue(decodedToken.username);
          }
          this.processing = false;
        }
      );
  }
}
