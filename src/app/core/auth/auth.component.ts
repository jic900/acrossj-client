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
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit, OnDestroy {

  authConfig: {};
  @ViewChild(SignInComponent) signInForm: SignInComponent;
  @ViewChild(SignUpComponent) signUpForm: SignUpComponent;
  selectedIndex: number;
  private subscription: any;

  constructor(private route: ActivatedRoute) {
    this.authConfig = AuthConfig;
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.selectedIndex = 0;
      if (params['id'] === 'signup') {
        this.selectedIndex = 1;
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
