import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCheckboxModule } from '@angular/material';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileService } from './profile/services/profile.service';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMenuComponent } from './profile/profilemenu/profilemenu.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from './profile/changepassword/changepassword.component';
import { MessageComponent } from './message/message.component';
import { EventComponent } from './event/event.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MdCheckboxModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileMenuComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    MessageComponent,
    EventComponent,
    UploadComponent
  ],
  exports: [
    HomeComponent
  ],
  providers: [ProfileService]
})

export class FeaturesModule {
}
