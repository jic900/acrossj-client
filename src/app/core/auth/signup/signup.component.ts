import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControlData } from 'app/shared/interfaces/formcontroldata.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'aj-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css'],
  providers: [AuthService]
})
export class SignUpComponent implements OnInit {

  @Input() formData: {};
  inputListData: IFormControlData[];
  formGroup: FormGroup;
  @ViewChild('form') form;
  passwordType: string;
  processing: boolean;
  message: string;
  success: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.inputListData = this.formData['controls']
      .filter(control => {
        return control.type === 'input';
      })
      .map(control => {
        return control.data;
      });
    this.passwordType = 'password';
    this.message = null;
    this.success = false;
    this.formGroup = new FormGroup({}, this.passwordMatch);
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;;
  }

  onClicked(event): void {
    console.log('onClicked');
    this.success = false;
    this.message = null;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
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
    return this.formData['validator'].error;
  }

  onSignUp(event): void {
    event.preventDefault();
    // console.log(this.formGroup);
    this.message = null;
    this.processing = true;

    const onSuccess = () => {
      this.message = this.formData['successMessage'];
      this.success = true;
      this.form.resetForm();
    }

    this.authService.signup(this.formGroup.value)
      .subscribe(
        data => {
          // console.log(data);
          onSuccess();
          this.processing = false;
        },
        err => {
          // console.log(err);
          // Ignore error when verify email is failed to be sent
          if (err.name !== 'SendVerifyMail') {
            this.message = err.message;
          } else {
            onSuccess();
          }
          this.processing = false;
        }
      );
  }

  reset(): void {
    this.message = null;
    this.success = false;
    this.form.resetForm();
  }

  // errorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
  //   // Error when invalid control is dirty, touched, or submitted
  //   const isSubmitted = form && form.submitted;
  //   return !!(control.invalid && isSubmitted);
  //   // return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
  // }
}
