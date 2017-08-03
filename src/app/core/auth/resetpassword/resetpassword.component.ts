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
    this.formGroup = new FormGroup({});
    this.jwtHelper = new JwtHelper();
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;;
  }

  setToken(token: string): void {
    this.token = token;
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.formGroup.get('username').setValue(decodedToken.username);
  }

  onClicked(event): void {
    this.message = null;
  }

  onBindControl(controlData: {}): void {
    console.log('control name:  ' + controlData['name']);
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
      password: this.formGroup.value.password
    }
    this.authService.resetPassword(requestData)
      .subscribe(
        data => {
          this.message = this.formData.messages['success'];
          this.success = true;
          this.form.resetForm();
        },
        err => {
          if (err.name === 'TokenExpired' || err.name === 'InvalidToken' || err.name === 'VerifyToken') {

          } else if (err.name === 'UserNotFound') {
            this.message = this.formData.errors['userNotFound'];
          } else {
            this.message = err.message;
          }
          this.processing = false;
        }
      );
  }
}
