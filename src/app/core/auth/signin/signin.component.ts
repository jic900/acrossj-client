import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { IFormData, IFormControlData } from 'app/shared/interfaces/formdata.interface';

@Component({
  selector: 'aj-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.css']
})

export class SignInComponent implements OnInit {

  @Input() formData: IFormData;
  inputListData: IFormControlData[];
  formGroup: FormGroup;
  @ViewChild('form') form;
  passwordType: string;
  processing: boolean;
  message: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.inputListData = this.formData.controls
      .filter(control => {
        return control.type === 'input';
      })
      .map(control => {
        return control.data;
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
          console.log(err);
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
