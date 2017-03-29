import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './nav/navbar.component';
import { SigninComponent } from './auth/signin.component';
import { SignupComponent } from './auth/signup.component';
import { DropdownDirective } from './nav/dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarComponent,
    SigninComponent,
    SignupComponent,
    DropdownDirective
  ],
  exports: [ NavbarComponent, SigninComponent, SignupComponent ]
})
export class CoreModule { }
