import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { ResetPasswordConfig } from 'app/config/auth.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';

interface IResetPassword {
  oldPassword: IInputElement;
  password: IInputElement;
  confirmPassword: IInputElement;
  showPassword: IElement;
  submitButton: IElement;
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
  formGroup: FormGroup;
  passwordType: string;
  processing: boolean;
  message: string;

  constructor(private authService: AuthService) {
    this.formData = new ResetPasswordConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.passwordType = 'password';
    this.message = null;
    this.formGroup = new FormGroup({});
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

  onResetPassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;

    this.authService.resetPassword(this.formGroup.value)
      .subscribe(
        data => {
        },
        err => {
        }
      );
  }
}
