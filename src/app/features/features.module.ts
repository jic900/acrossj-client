import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdCheckboxModule, MdButtonModule, MdToolbarModule } from '@angular/material';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileMenuComponent } from './profile/profilemenu/profilemenu.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from './profile/changepassword/changepassword.component';
import { EventSummaryComponent } from './event/eventsummary.component';
import { EventListComponent } from './event/eventlist/eventlist.component';
import { EventDetailComponent } from './event/eventdetail/eventdetail.component';
import { EventComponent } from './event/event/event.component';
import { MessageSummaryComponent } from './message/messagesummary.component';
import { MessageDetailComponent } from './message/messagedetail/messagedetail.component';
import { UploadSummaryComponent } from './upload/uploadsummary.component';
import { UploadDetailComponent } from './upload/uploaddetail/uploaddetail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    MdCheckboxModule,
    MdButtonModule,
    MdToolbarModule
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    DashboardComponent,
    ProfileComponent,
    ProfileMenuComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    EventSummaryComponent,
    EventListComponent,
    EventDetailComponent,
    EventComponent,
    MessageSummaryComponent,
    MessageDetailComponent,
    UploadSummaryComponent,
    UploadDetailComponent

  ],
  exports: [
    HomeComponent
  ],
  providers: [UserService]
})

export class FeaturesModule {
}
