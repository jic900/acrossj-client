import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './nav/navbar.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarComponent,
    SigninComponent,
    SignupComponent
  ],
  exports: [ NavbarComponent, SigninComponent, SignupComponent ]
})
export class CoreModule { }
