import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdTabsModule, MdCardModule, MdInputModule, MdCheckboxModule } from '@angular/material';
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

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    MdTabsModule,
    MdCardModule,
    MdInputModule,
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
    FooterComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SearchMenuComponent,
    AuthComponent
  ]
})
export class CoreModule { }
