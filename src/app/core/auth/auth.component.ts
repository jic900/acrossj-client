import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { AuthConfig } from 'app/config/auth.config';
import { AuthValidator } from './auth.validator';

interface ISignInData {
  username: string;
  password: string;
}

interface ISignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit, OnDestroy {

  authConfig: {};
  selectedIndex: number;
  signIn: ISignInData;
  signUp: ISignUpData;
  signInPasswordInputType: string;
  signUpPasswordInputType: string;
  authValidator: AuthValidator;
  private sub: any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private translate: TranslateService) {
    this.authConfig = AuthConfig;
    this.authValidator = new AuthValidator();
    this.signIn = {username: '', password: ''};
    this.signUp = {username: '', email: '', password: '', confirmPassword: ''};
    this.signInPasswordInputType = 'password';
    this.signUpPasswordInputType = 'password';
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

  onSignIn(form: NgForm): void {
    console.log(form.value.signInUsername);
    console.log(form.value.signInPassword);
  }

  onSignUp(form: NgForm): void {
    const signupData = {
      username: form.value.signUpUsername,
      email: form.value.signUpEmail,
      password: form.value.signUpPassword
    }
    console.log(form.value);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private resetSignIn(): void {
    this.signIn.username = '';
    this.signIn.password = '';
  }

  private resetSignUp(): void {
    this.signUp.username = '';
    this.signUp.email = '';
    this.signUp.password = '';
    this.signUp.confirmPassword = '';
  }
}
