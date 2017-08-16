/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdTabsModule,
  MdCardModule,
  MdCheckboxModule,
  MdToolbarModule,
  MdButtonModule,
  MdListModule,
  MdIconModule
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
import { ProfileDetailComponent } from './profile/profiledetail/profiledetail.component';
import { EventRelatedInfoComponent } from './profile/eventrelatedinfo/eventrelatedinfo.component';
import { GroupInfoComponent } from './profile/groupinfo/groupinfo.component';
import { GeneralInfoComponent } from './profile/eventrelatedinfo/generalinfo/generalinfo.component';
import { SkiiInfoComponent } from './profile/eventrelatedinfo/skiiinfo/skiiinfo.component';
import { RunningInfoComponent } from './profile/eventrelatedinfo/runninginfo/runninginfo.component';
import { HikingInfoComponent } from './profile/eventrelatedinfo/hikinginfo/hikinginfo.component';
import { CampingInfoComponent } from './profile/eventrelatedinfo/campinginfo/campinginfo.component';
import { BicyclingInfoComponent } from './profile/eventrelatedinfo/bicyclinginfo/bicyclinginfo.component';
import { OthersInfoComponent } from './profile/eventrelatedinfo/othersinfo/othersinfo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    EventModule,
    MdTabsModule,
    MdCardModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdButtonModule,
    MdListModule,
    MdIconModule
  ],
  declarations: [
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileMenuComponent,
    ProfileDetailComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    MessageSummaryComponent,
    MessageDetailComponent,
    UploadSummaryComponent,
    UploadDetailComponent,
    EventRelatedInfoComponent,
    GroupInfoComponent,
    GeneralInfoComponent,
    SkiiInfoComponent,
    RunningInfoComponent,
    HikingInfoComponent,
    CampingInfoComponent,
    BicyclingInfoComponent,
    OthersInfoComponent
  ],
  providers: [UserService]
})

export class UserModule {
}
