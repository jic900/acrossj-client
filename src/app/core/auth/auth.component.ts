import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthConfig } from 'app/config/auth.config';

@Component({
  selector: 'aj-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  authConfig: {};
  selectedIndex: number;
  signInUsername: string;
  signInPassword: string;
  signUpUsername: string;
  signUpPassword: string;
  signUpConfirmPassword: string;
  signInPasswordInputType: string;
  signUpPasswordInputType: string;
  private sub: any;

  constructor(private authService: AuthService, private route: ActivatedRoute) {
    this.authConfig = AuthConfig;
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
      this.resetSignUpInput();
    } else {
      this.resetSignInInput();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private resetSignInInput(): void {
    this.signInUsername = '';
    this.signInPassword = '';
  }

  private resetSignUpInput(): void {
    this.signUpUsername = '';
    this.signUpPassword = '';
    this.signUpConfirmPassword = '';
  }
}
