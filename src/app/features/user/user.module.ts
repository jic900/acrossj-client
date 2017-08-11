/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdCardModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdButtonModule
} from '@angular/material';

import { UserRoutingModule } from 'app/features/user/user-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { EventModule } from 'app/features/event/event.module';
import { UserService } from './services/user.service';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMenuComponent } from './profile/profilemenu/profilemenu.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from './profile/changepassword/changepassword.component';
import { MessageSummaryComponent } from './message/messagesummary.component';
import { MessageDetailComponent } from './message/messagedetail/messagedetail.component';
import { UploadSummaryComponent } from './upload/uploadsummary.component';
import { UploadDetailComponent } from './upload/uploaddetail/uploaddetail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    EventModule,
    MdCardModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdButtonModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileMenuComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    MessageSummaryComponent,
    MessageDetailComponent,
    UploadSummaryComponent,
    UploadDetailComponent
  ],
  providers: [UserService]
})

export class UserModule {
}
