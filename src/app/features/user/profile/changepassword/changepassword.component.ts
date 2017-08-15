import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

import { AppConstant } from 'app/config/common/app-constant.config';
import { slideInDownAnimation } from 'app/config/common/animation.config';
import { ChangePasswordConfig } from 'app/config/user/profile/changepassword.config';
import { UserService } from 'app/features/user/services/user.service';
import { Util } from 'app/shared/util/util';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

interface IChangePassword {
  oldPassword: IInputElement;
  password: IInputElement;
  confirmPassword: IInputElement;
  showPassword: IElement;
  submitButton: IElement;
  backLink: ILinkElement;
}

interface IChangePasswordMessage {
  success: IMessageElement;
  invalidPassword: IMessageElement;
  samePassword: IMessageElement;
}

@Component({
  selector: 'aj-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  animations: [ slideInDownAnimation ]
})

export class ChangePasswordComponent {

  formData: IForm;
  formElements: IChangePassword;
  inputElements: IInputElement[];
  messages: IChangePasswordMessage;
  @ViewChild('form') form;
  formGroup: FormGroup;
  passwordType: string;
  processing: boolean;
  message: IMessageElement;

  constructor(private userService: UserService, private router: Router) {
    this.formData = new ChangePasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.passwordType = 'password';
    this.message = null;
    this.processing = false;
    this.formGroup = new FormGroup({}, this.passwordMatch);
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  onClicked(event): void {
    this.message = null;
  }

  onBackLinkClicked(event): void {
    this.userService.setMenuOpened(true);
    // this.router.navigate(['/user/profile']);
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
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

  onChangePassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;
    const requestData = {
      currentPassword: this.formGroup.value.oldPassword,
      newPassword: this.formGroup.value.password
    };

    this.userService.changePassword(requestData)
      .subscribe(
        data => {
          this.message = this.messages.success;
          this.form.resetForm();
        },
        err => {
          if (err.name === 'InvalidPassword') {
            this.message = this.messages.invalidPassword;
          } else if (err.name === 'SamePassword') {
            this.message = this.messages.samePassword;
          } else {
            this.message = Util.createErrorMessage(err.name, err.message);
            this.form.resetForm();
          }
          this.processing = false;
        }
      );
  }
}
