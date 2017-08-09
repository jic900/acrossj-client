import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  MdTabsModule,
  MdCardModule,
  MdCheckboxModule,
  MdProgressBarModule
} from '@angular/material';

import { SharedModule } from 'app/shared/shared.module';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SubMenuComponent } from './navbar/sidemenu/submenu/submenu.component';
import { SearchMenuComponent } from './navbar/search/searchmenu/searchmenu.component';
import { SideMenuComponent } from './navbar/sidemenu/sidemenu.component';
import { SearchfieldComponent } from './navbar/search/searchfield/searchfield.component';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { SignInComponent } from './auth/signin/signin.component';
import { VerifyEmailComponent } from './auth/verifyemail/verifyemail.component';
import { ForgotPasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './auth/resetpassword/resetpassword.component';
import { SendVerifyEmailComponent } from './auth/sendverifyemail/sendverifyemail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MdTabsModule,
    MdCardModule,
    MdCheckboxModule,
    MdProgressBarModule,
  ],
  declarations: [
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
    SubMenuComponent,
    SearchMenuComponent,
    SideMenuComponent,
    SearchfieldComponent,
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SendVerifyEmailComponent
  ],
  exports: [
    LoaderComponent,
    NavbarComponent,
    FooterComponent
  ]
})

export class CoreModule { }
