import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { ResetPasswordConfig } from 'app/config/auth.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';
import { Util } from 'app/shared/util/util';

interface IResetPassword {
  username: IInputElement;
  password: IInputElement;
  confirmPassword: IInputElement;
  showPassword: IElement;
  submitButton: IElement;
}

interface IResetPasswordMessage {
  success: IMessageElement;
  invalidToken: IMessageElement;
  invalidUsername: IMessageElement;
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
  messages: IResetPasswordMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  passwordType: string;
  processing: boolean;
  message: IMessageElement;
  jwtHelper: JwtHelper;
  token: string;
  showInput: boolean;

  constructor(private authService: AuthService) {
    this.formData = new ResetPasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.passwordType = 'password';
    this.message = null;
    this.processing = false;
    this.showInput = true;
    this.formGroup = new FormGroup({}, this.passwordMatch);
    this.jwtHelper = new JwtHelper();
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  setToken(token: string): void {
    this.token = token;
    let decodedToken;
    try {
      decodedToken = this.jwtHelper.decodeToken(token);
    } catch (e) {}
    if (!decodedToken) {
      this.message = this.messages.invalidToken;
      this.showInput = false;
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
    const requestData = {
      token: this.token,
      newPassword: this.formGroup.value.password
    };

    this.authService.resetPassword(requestData)
      .subscribe(
        data => {
          this.message = this.messages.success;
          this.showInput = false;
        },
        err => {
          if (err.name === 'TokenExpired' || err.name === 'InvalidToken' || err.name === 'VerifyToken') {
            this.message = this.messages.invalidToken;
            this.showInput = false;
          } else if (err.name === 'UserNotFound') {
            this.message = this.messages.invalidUsername;
            this.showInput = false;
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
            // this.form.resetForm();
            // const decodedToken = this.jwtHelper.decodeToken(this.token);
            // this.formGroup.get('username').setValue(decodedToken.username);
          }
          this.processing = false;
        }
      );
  }
}
