import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdTabsModule, MdCardModule, MdCheckboxModule } from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { SubMenuComponent } from './navbar/sidemenu/submenu/submenu.component';
import { SearchMenuComponent } from './navbar/search/searchmenu/searchmenu.component';
import { SharedModule } from 'app/shared/shared.module';
import { SideMenuComponent } from './navbar/sidemenu/sidemenu.component';
import { SearchfieldComponent } from './navbar/search/searchfield/searchfield.component';
import { AuthComponent } from './auth/auth.component';
import { FooterComponent } from './footer/footer.component';
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
    MdCheckboxModule
  ],
  declarations: [
    NavbarComponent,
    SubMenuComponent,
    SearchMenuComponent,
    SideMenuComponent,
    SearchfieldComponent,
    AuthComponent,
    SignUpComponent,
    SignInComponent,
    FooterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SendVerifyEmailComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SearchMenuComponent,
    AuthComponent
  ]
})
export class CoreModule { }
