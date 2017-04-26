import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { SubmenuComponent } from './navbar/submenu.component';
import { SearchmenuComponent } from './navbar/searchmenu.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    SubmenuComponent,
    SearchmenuComponent
  ],
  exports: [
    NavbarComponent,
    SearchmenuComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class CoreModule { }
