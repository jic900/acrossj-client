import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AuthConfig } from 'app/config/auth.config';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit, OnDestroy {

  authConfig: {};
  @ViewChild(SignInComponent) signInForm: SignInComponent;
  @ViewChild(SignUpComponent) signUpForm: SignUpComponent;
  selectedIndex: number;
  private sub: any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private translate: TranslateService) {
    this.authConfig = AuthConfig;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.selectedIndex = 0;
      if (params['id'] === 'signup') {
        this.selectedIndex = 1;
      }
      // this.selectedIndex = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }

  // validateFailed(formName: string, controlName: string, groupValidatorName?: string): boolean {
  //   const formGroup = formName === 'signin' ? this.signinForm : this.signupForm;
  //   const formControl = formGroup.get(controlName);
  //   const submitted = formName === 'signin' ? this.signinSubmitted : this.signupSubmitted;
  //   if (!groupValidatorName) {
  //     return !formControl.valid && (formControl.touched || submitted);
  //   } else {
  //     // console.log(formGroup);
  //     return formGroup.hasError(groupValidatorName) && (formControl.touched || submitted);
  //   }
  // }
  //
  // groupValidateFailed(formName: string, controlName: string, groupValidatorName?: string): boolean {
  //   const formGroup = formName === 'signin' ? this.signinForm : this.signupForm;
  //   const formControl = formGroup.get(controlName);
  //   const submitted = formName === 'signin' ? this.signinSubmitted : this.signupSubmitted;
  //   return formGroup.hasError(groupValidatorName) && (formControl.touched || submitted);
  // }
  //
  // getError(formName: string, controlName: string): string {
  //   const formGroup = formName === 'signin' ? this.signinForm : this.signupForm;
  //   const errors = formName === 'signin' ? AuthConfig.signin.errors[controlName] : AuthConfig.signup.errors[controlName];
  //   // console.log(Util.getValidationError(formGroup.get(controlName), errors));
  //   return Util.getValidationError(formGroup.get(controlName), errors);
  // }

  onSelectedTabIndexChange(): void {
    if (this.selectedIndex === 0) {
      this.signUpForm.reset();
    } else {
      this.signInForm.reset();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
