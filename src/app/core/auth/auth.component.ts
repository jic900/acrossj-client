import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild, ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthConfig } from 'app/config/auth.config';
import { AuthService } from './services/auth.service';
import { IElement } from 'app/config/interfaces/element.interface';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verifyemail/verifyemail.component';
import { SendVerifyEmailComponent } from './sendverifyemail/sendverifyemail.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './resetpassword/resetpassword.component';

interface IAuth {
  signin: IElement;
  signup: IElement;
  verifyEmail: IElement;
  sendVerifyEmail: IElement;
  forgotPassword: IElement;
  resetPassword: IElement;
}

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements AfterViewInit, OnDestroy {

  authData: IAuth;
  @ViewChild(SignInComponent) signInComponent: SignInComponent;
  @ViewChild(SignUpComponent) signUpComponent: SignUpComponent;
  @ViewChild(VerifyEmailComponent) verifyEmailComponent: VerifyEmailComponent;
  @ViewChild(SendVerifyEmailComponent) sendVerifyEmailComponent: SendVerifyEmailComponent;
  @ViewChild(ForgotPasswordComponent) forgotPasswordComponent: ForgotPasswordComponent;
  @ViewChild(ResetPasswordComponent) resetPasswordComponent: ResetPasswordComponent;
  selectedIndex: number;
  subscription: any;
  authState: string;

  constructor(private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private cdRef: ChangeDetectorRef) {
    this.authData = _.mapKeys(new AuthConfig().elements, 'name');
    this.selectedIndex = 1;
  }

  ngAfterViewInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.authState = params['id'];
      switch (this.authState) {
        case 'signin': {
          this.selectedIndex = 0;
          this.signInComponent.reset();
          this.cdRef.detectChanges();
          break;
        }
        case 'signup': {
          this.selectedIndex = 1;
          this.signUpComponent.reset();
          this.cdRef.detectChanges();
          break;
        }
        case 'signout': {
          this.authService.signout();
          this.router.navigateByUrl('/');
          break;
        }
        case 'verifyemail': {
          this.router.navigateByUrl(this.route.snapshot.url.join('/'));
          const token = this.route.snapshot.queryParams['token'];
          if (!token) {
            this.router.navigateByUrl('/');
          } else {
            this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
          }
          break;
        }
        case 'sendverifyemail': {
          this.sendVerifyEmailComponent.reset();
          break;
        }
        case 'forgotpassword': {
          this.forgotPasswordComponent.reset();
          break;
        }
        case 'resetpassword': {
          if (this.authService.authenticated) {
            this.router.navigateByUrl('/');
            // this.router.navigateByUrl('/profile/changepassword');
          } else {
            const token = this.route.snapshot.queryParams['token'];
            if (!token) {
              this.router.navigateByUrl('/');
            } else {
              this.router.navigateByUrl(this.route.snapshot.url.join('/'));
              setTimeout(() => {
                if (token) {
                  this.resetPasswordComponent.setToken(token);
                }
              }, 500);
            }
          }
          break;
        }
      }
    });
  }

  onSelectedTabIndexChange(): void {
    // this.selectedIndex === 0 ? this.signUpForm.reset() : this.signInForm.reset();
    this.selectedIndex === 0 ? this.router.navigateByUrl('/auth/signin') : this.router.navigateByUrl('/auth/signup');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
