import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthConfig } from 'app/config/auth.config';
import { AuthService } from './services/auth.service';
import { IElement } from 'app/config/interfaces/element.interface';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verifyemail/verifyemail.component';


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
  @ViewChild('tabGroup') tabGroup: any;
  @ViewChild(SignInComponent) signInForm: SignInComponent;
  @ViewChild(SignUpComponent) signUpForm: SignUpComponent;
  @ViewChild(VerifyEmailComponent) verifyEmailComponent: VerifyEmailComponent;
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
            // this.router.navigateByUrl(this.route.snapshot.url.join('/'));
            this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
            break;
          }
          case 'forgotpassword': {

          }
          case 'resetpassword': {

          }
        }
        // if (params['id'] !== 'signin' && params['id'] !== 'signup' && params['id'] !== 'signout') {
        //   this.hideTab = true;
        //   if (params['id'] === 'verifyemail') {
        //     this.router.navigateByUrl(this.route.snapshot.url.join('/'));
        //     this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
        //   }
        // } else {
        //   this.hideTab = false;
        //   this.selectedIndex = 0;
        //   if (params['id'] === 'signup') {
        //     this.selectedIndex = 1;
        //   } else if (params['id'] === 'signout') {
        //     this.authService.signout();
        //     this.router.navigateByUrl('/');
        //   }
        // }

        // this.selectedIndex = +params['id']; // (+) converts string 'id' to a number
        // In a real app: dispatch action to load the details here.
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
