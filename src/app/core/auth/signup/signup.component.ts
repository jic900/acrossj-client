import {
  Component,
  OnInit,
  Input,
  ViewChild
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
  inProcess: boolean;

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
    this.formGroup = new FormGroup({}, this.passwordMatch);
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.inProcess;
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
    // const signupData = {
    //   username: form.value.signUpUsername,
    //   email: form.value.signUpEmail,
    //   password: form.value.signUpPassword
    // }
    // console.log(form.value);
    event.preventDefault();
    console.log(this.formGroup);
    this.inProcess = true;
    this.authService.signup(this.formGroup.value);
    this.inProcess = false;
  }

  reset(): void {
    this.form.resetForm();
  }

  // errorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
  //   // Error when invalid control is dirty, touched, or submitted
  //   const isSubmitted = form && form.submitted;
  //   return !!(control.invalid && isSubmitted);
  //   // return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
  // }
}
