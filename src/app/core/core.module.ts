import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { SubmenuComponent } from './navbar/submenu.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    SubmenuComponent
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class CoreModule { }
