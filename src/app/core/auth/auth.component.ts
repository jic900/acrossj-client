import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AuthConfig } from 'app/config/auth.config';
import { Util } from 'app/shared/util/util';

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit, OnDestroy {

  authConfig: {};
  signinForm: FormGroup;
  signupForm: FormGroup;
  @ViewChild('signinNgForm') signinNgForm;
  @ViewChild('signupNgForm') signupNgForm;
  signinSubmitted: boolean;
  signupSubmitted: boolean;
  selectedIndex: number;
  signInPasswordInputType: string;
  signUpPasswordInputType: string;
  private sub: any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private translate: TranslateService) {
    this.authConfig = AuthConfig;
    this.signInPasswordInputType = 'password';
    this.signUpPasswordInputType = 'password';
  }

  ngOnInit(): void {
    const customValidators = {'passwordMatch': this.passwordMatch}
    this.signinForm = Util.createFormGroup(AuthConfig.signin.formGroup, customValidators);
    this.signupForm = Util.createFormGroup(AuthConfig.signup.formGroup, customValidators);
    this.signinSubmitted = false;
    this.signupSubmitted = false;

    this.sub = this.route.params.subscribe(params => {
      this.selectedIndex = 0;
      if (params['id'] === 'signup') {
        this.selectedIndex = 1;
      }
      // this.selectedIndex = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }

  passwordMatch(formGroup: FormGroup): {} {
    console.log('passwordMatch');
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {'passwordMatch': true};
  }

  showError(formName: string, controlName: string): boolean {
    const formControl = formName === 'signin' ? this.signinForm.get(controlName) : this.signupForm.get(controlName);
    const submitted = formName === 'signin' ? this.signinSubmitted : this.signupSubmitted;
    return !formControl.valid && (formControl.touched || submitted);
  }

  getErrorMessage(formName: string, controlName: string): string {
    const formGroup = formName === 'signin' ? this.signinForm : this.signupForm;
    const formControl = formGroup.get(controlName);
    const errors = formName === 'signin' ? AuthConfig.signin.errors[controlName] : AuthConfig.signup.errors[controlName];
    return Util.getValidationError(formGroup.get(controlName), errors);
  }

  onSignInClick(event): void {
    event.preventDefault();
  }

  onSignInPasswordInputTypeChange(): void {
    this.signInPasswordInputType = this.signInPasswordInputType === 'password' ? 'text' : 'password';
  }

  onSignUpPasswordInputTypeChange(): void {
    this.signUpPasswordInputType = this.signUpPasswordInputType === 'password' ? 'text' : 'password';
  }

  onSelectedTabIndexChange(): void {
    if (this.selectedIndex === 0) {
      this.resetSignUp();
    } else {
      this.resetSignIn();
    }
  }

  onSignIn(): void {
    this.signinSubmitted = true;
    // console.log(this.signinForm);
  }

  onSignUp(): void {
    // const signupData = {
    //   username: form.value.signUpUsername,
    //   email: form.value.signUpEmail,
    //   password: form.value.signUpPassword
    // }
    // console.log(form.value);
    this.signupSubmitted = true;
    // console.log(this.signupForm);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  // errorStateMatcher(control: FormControl, form: FormGroupDirective | NgForm): boolean {
  //   // Error when invalid control is dirty, touched, or submitted
  //   const isSubmitted = form && form.submitted;
  //   return !!(control.invalid && isSubmitted);
  //   // return !!(control.invalid && (control.dirty || control.touched || isSubmitted));
  // }

  private resetSignIn(): void {
    this.signinSubmitted = false;
    this.signinNgForm.resetForm();
  }

  private resetSignUp(): void {
    this.signupSubmitted = false;
    this.signupNgForm.resetForm();
  }
}
