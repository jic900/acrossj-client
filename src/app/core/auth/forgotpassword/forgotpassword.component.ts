import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { ForgotPasswordConfig } from 'app/config/auth.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';

interface IForgotPassword {
  email: IInputElement;
  submitButton: IElement;
}

@Component({
  selector: 'aj-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['../auth.component.css']
})

export class ForgotPasswordComponent {

  formData: IForm;
  formElements: IForgotPassword;
  formGroup: FormGroup;
  processing: boolean;
  message: string;

  constructor(private authService: AuthService) {
    this.formData = new ForgotPasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.message = null;
    this.formGroup = new FormGroup({});
  }

  onClicked(event): void {
    this.message = null;
  }

  onForgotPassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;

    this.authService.forgotPassword(this.formGroup.value)
      .subscribe(
        data => {
          // // console.log(data);
          // // onSuccess();
          // this.message = 'success';
          // this.processing = false;
          // this.authService.setAuthenticated(true);
          // // this.router.navigateByUrl('/');
        },
        err => {
          // console.log(err);
          // if (err.name === 'InvalidUserName') {
          //   this.message = this.formData.errors['userNotFound'];
          // } else if (err.name === 'InvalidPassword') {
          //   this.message = this.formData.errors['invalidPassword'];
          // } else if (err.name === 'NotVerified') {
          //   this.message = 'User not verified';
          //   this.authService.setAuthenticated(true);
          // } else {
          //   this.message = err.message;
          // }
          // this.processing = false;
        }
      );
  }
}
