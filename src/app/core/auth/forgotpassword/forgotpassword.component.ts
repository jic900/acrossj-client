import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { ForgotPasswordConfig } from 'app/config/auth.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

interface IForgotPassword {
  email: IInputElement;
  submitButton: IElement;
  backSignIn: ILinkElement;
}

@Component({
  selector: 'aj-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['../auth.component.css']
})

export class ForgotPasswordComponent {

  formData: IForm;
  formElements: IForgotPassword;
  @ViewChild('form') form;
  formGroup: FormGroup;
  processing: boolean;
  message: string;
  showInput: boolean;

  constructor(private authService: AuthService) {
    this.formData = new ForgotPasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.processing = false;
    this.message = this.message = this.formData.messages['hint'];
    this.showInput = true;
    this.formGroup = new FormGroup({});
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  onClicked(event): void {
    // this.success = true;
    this.message = this.formData.messages['hint'];
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onForgotPassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;

    const onSuccess = () => {
      this.message = this.formData.messages['success'];
      this.showInput = false;
      this.form.resetForm();
    }

    this.authService.forgotPassword(this.formGroup.value)
      .subscribe(
        data => {
          onSuccess();
          this.processing = false;
        },
        err => {
          if (err.name === 'UserNotFound') {
            this.message = this.formData.errors['userNotFound'];
            this.showInput = true;
          } else if (err.name === 'SendResetPasswordMail') {
            onSuccess();
            this.showInput = false;
          } else {
            this.message = err.message;
          }
          this.processing = false;
        }
      );
  }
}
