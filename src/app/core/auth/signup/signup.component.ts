import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormControlData } from 'app/shared/interfaces/formcontroldata.interface';

@Component({
  selector: 'aj-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignUpComponent implements OnInit {

  @Input() formData: {};
  inputListData: IFormControlData[];
  formGroup: FormGroup;
  @ViewChild('form') form;
  passwordType: string;
  submitted: boolean;

  constructor() {}

  ngOnInit() {
    this.inputListData = this.formData['controls']
      .filter(control => {
        return control.type === 'input';
      })
      .map(control => {
        return control.data;
      });
    this.passwordType = 'password';
    this.submitted = false;
    this.formGroup = new FormGroup({}, this.passwordMatch);
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onPasswordTypeChange(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  passwordMatch(formGroup: FormGroup): {} {
    // console.log(formGroup);
    // console.log(formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {'passwordMatch': true});
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      return passwordControl.value === confirmPasswordControl.value ? null : {'passwordMatch': true};
    }
  }

  getFormValidateData(controlName: string) {
    if (controlName === 'confirmPassword') {
      return {'function': this.formValidateFailed, 'error': this.formData['validator'].error};
    }
    return null;
  }

  formValidateFailed = () => {
    return this.formGroup.hasError('passwordMatch');
  }

  onSignUp(event): void {
    // const signupData = {
    //   username: form.value.signUpUsername,
    //   email: form.value.signUpEmail,
    //   password: form.value.signUpPassword
    // }
    // console.log(form.value);
    event.preventDefault();
    this.submitted = true;
    // console.log(this.signinForm);
  }

  reset(): void {
    this.submitted = false;
    this.form.resetForm();
  }

  // errorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
  //   // Error when invalid control is dirty, touched, or submitted
  //   const isSubmitted = form && form.submitted;
  //   return !!(control.invalid && isSubmitted);
  //   // return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
  // }
}
