import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMenuComponent } from './profile/profilemenu/profilemenu.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';



@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileMenuComponent,
    PersonalInfoComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class FeaturesModule {
}
