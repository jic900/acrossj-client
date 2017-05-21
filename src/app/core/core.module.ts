import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { SubMenuComponent } from './navbar/sidemenu/submenu/submenu.component';
import { SearchMenuComponent } from './navbar/searchmenu/searchmenu.component';
import { SharedModule } from 'app/shared/shared.module';
import { SideMenuComponent } from './navbar/sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    SubMenuComponent,
    SearchMenuComponent,
    SideMenuComponent
  ],
  exports: [
    NavbarComponent,
    SearchMenuComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class CoreModule { }
