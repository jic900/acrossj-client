import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { SendVerifyEmailConfig } from 'app/config/auth.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

interface ISendVerifyEmail {
  email: IInputElement;
  submitButton: IElement;
  backSignIn: ILinkElement;
}

@Component({
  selector: 'aj-sendverifyemail',
  templateUrl: './sendverifyemail.component.html',
  styleUrls: ['../auth.component.css']
})
export class SendVerifyEmailComponent {

  formData: IForm;
  formElements: ISendVerifyEmail;
  @ViewChild('form') form;
  formGroup: FormGroup;
  processing: boolean;
  message: string;
  showInput: boolean;

  constructor(private authService: AuthService) {
    this.formData = new SendVerifyEmailConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.formGroup = new FormGroup({});
    this.reset();
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  reset(): void {
    this.processing = false;
    this.message = this.message = this.formData.messages['hint'];
    this.showInput = true;
  }

  onClicked(event): void {
    // this.success = true;
    this.message = this.formData.messages['hint'];
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onSendVerifyEmail(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;

    const onSuccess = () => {
      this.message = this.formData.messages['success'];
      this.showInput = false;
      this.form.resetForm();
    }

    this.authService.sendVerifyEmail(this.formGroup.value)
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
