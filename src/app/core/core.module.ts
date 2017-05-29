import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SubMenuComponent } from './navbar/sidemenu/submenu/submenu.component';
import { SearchMenuComponent } from './navbar/search/searchmenu/searchmenu.component';
import { SharedModule } from 'app/shared/shared.module';
import { SideMenuComponent } from './navbar/sidemenu/sidemenu.component';
import { RouterModule } from '@angular/router';
import { SearchfieldComponent } from './navbar/search/searchfield/searchfield.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    SubMenuComponent,
    SearchMenuComponent,
    SideMenuComponent,
    SearchfieldComponent,
    AuthComponent
  ],
  exports: [
    NavbarComponent,
    SearchMenuComponent,
    AuthComponent
  ]
})
export class CoreModule { }
