import {
  Component,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { SignInConfig } from 'app/config/auth.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';


@Component({
  selector: 'aj-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.css']
})

export class SignInComponent {

  formData: IForm;
  formElements: {};
  inputElements: IInputElement[];
  formGroup: FormGroup;
  @ViewChild('form') form;
  passwordType: string;
  processing: boolean;
  message: string;

  constructor(private authService: AuthService, private router: Router) {
    this.formData = SignInConfig;
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.passwordType = 'password';
    this.message = null;
    this.formGroup = new FormGroup({});
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  onClicked(event): void {
    this.message = null;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  onSignIn(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;

    this.authService.signin(this.formGroup.value)
      .subscribe(
        data => {
          // console.log(data);
          // onSuccess();
          this.message = 'success';
          this.processing = false;
          this.reset();
          this.authService.setAuthenticated(true);
          // TODO: navigate to previous page if exisits.
          this.router.navigateByUrl('/');
        },
        err => {
          // console.log(err);
          if (err.name === 'InvalidUserName') {
            this.message = this.formData.errors['userNotFound'];
          } else if (err.name === 'InvalidPassword') {
            this.message = this.formData.errors['invalidPassword'];
          } else if (err.name === 'NotVerified') {
            this.message = 'User not verified';
            this.authService.setAuthenticated(true);
          } else {
            this.message = err.message;
          }
          this.processing = false;
        }
      );
  }

  reset(): void {
    this.message = null;
    this.form.resetForm();
  }
}
