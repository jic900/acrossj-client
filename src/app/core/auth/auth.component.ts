import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthConfig } from 'app/config/auth.config';
import { AuthService } from './services/auth.service';
import { IElement } from 'app/config/interfaces/element.interface';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verifyemail/verifyemail.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';


interface IAuth {
  signin: IElement;
  signup: IElement;
  verifyEmail: IElement;
  forgotPassword: IElement;
  resetPassword: IElement;
}

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {

  authData: IAuth;
  @ViewChild(SignInComponent) signInForm: SignInComponent;
  @ViewChild(SignUpComponent) signUpForm: SignUpComponent;
  @ViewChild(VerifyEmailComponent) verifyEmailComponent: VerifyEmailComponent;
  @ViewChild(ResetPasswordComponent) resetPasswordComponent: ResetPasswordComponent;
  selectedIndex: number;
  subscription: any;
  authState: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    this.authData = _.mapKeys(new AuthConfig().elements, 'name');
    this.selectedIndex = 1;
  }

  ngOnInit(): void {
    if (!this.subscription) {
      this.subscription = this.route.params.subscribe(params => {
        this.authState = params['id'];
        switch (this.authState) {
          case 'signin': {
            this.selectedIndex = 0;
            break;
          }
          case 'signup': {
            this.selectedIndex = 1;
            break;
          }
          case 'signout': {
            this.authService.signout();
            this.router.navigateByUrl('/');
            break;
          }
          case 'verifyemail': {
            this.router.navigateByUrl(this.route.snapshot.url.join('/'));
            this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
            break;
          }
          case 'resetpassword': {
            const token = this.route.snapshot.queryParams['token'];
            console.log(token);
            this.router.navigateByUrl(this.route.snapshot.url.join('/'));
            setTimeout(()=>{
              if (token) {
                this.resetPasswordComponent.setToken(token);
              }
            }, 500);
          }
        }
      });
    }
  }

  onSelectedTabIndexChange(): void {
    this.selectedIndex === 0 ? this.signUpForm.reset() : this.signInForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
