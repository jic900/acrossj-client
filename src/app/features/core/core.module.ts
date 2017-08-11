import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MdProgressBarModule
} from '@angular/material';

import { SharedModule } from 'app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './navbar/sidemenu/sidemenu.component';
import { SubMenuComponent } from './navbar/sidemenu/submenu/submenu.component';
import { SearchMenuComponent } from './navbar/search/searchmenu/searchmenu.component';
import { SearchfieldComponent } from './navbar/search/searchfield/searchfield.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreRoutingModule,
    SharedModule,
    MdProgressBarModule
  ],
  declarations: [
    LoaderComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SubMenuComponent,
    SearchMenuComponent,
    SideMenuComponent,
    SearchfieldComponent
  ],
  exports: [
    LoaderComponent,
    NavbarComponent,
    FooterComponent
  ]
})

export class CoreModule { }
