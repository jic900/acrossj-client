import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { AuthConfig } from 'app/config/auth.config';
import { IComponent } from 'app/config/interfaces/component.interface';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { VerifyEmailComponent } from './verifyemail/verifyemail.component';

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {

  authData: IComponent;
  @ViewChild(SignInComponent) signInForm: SignInComponent;
  @ViewChild(SignUpComponent) signUpForm: SignUpComponent;
  @ViewChild(VerifyEmailComponent) verifyEmailComponent: VerifyEmailComponent;
  selectedIndex: number;
  subscription: any;
  hideTab: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.authData = _.mapKeys(AuthConfig.auth.elements, 'name');
    this.hideTab = false;
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      if (params['id'] !== 'signin' && params['id'] !== 'signup') {
        this.hideTab = true;
        if (params['id'] === 'verifyemail') {
          this.router.navigateByUrl(this.route.snapshot.url.join('/'));
          this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
        }
      } else {
        this.hideTab = false;
        this.selectedIndex = 0;
        if (params['id'] === 'signup') {
          this.selectedIndex = 1;
        }
      }
      if (params['id'] === 'verifyemail') {
        this.hideTab = true;
        this.router.navigateByUrl(this.route.snapshot.url.join('/'));
        this.verifyEmailComponent.verifyEmail(this.route.snapshot.queryParams['token']);
      } else {
        this.hideTab = false;
        this.selectedIndex = 0;
        if (params['id'] === 'signup') {
          this.selectedIndex = 1;
        }
      }

      // this.selectedIndex = +params['id']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
    });
  }

  onSelectedTabIndexChange(): void {
    this.selectedIndex === 0 ? this.signUpForm.reset() : this.signInForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
