///<reference path="profile/eventrelatedinfo/skiiinfo/skiiinfo.component.ts"/>
/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from 'app/can-deactivate-guard.service';
import { AuthGuard } from '../auth/services/authguard.service';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from './profile/changepassword/changepassword.component';
import { EventRelatedInfoComponent } from './profile/eventrelatedinfo/eventrelatedinfo.component';
import { GeneralInfoComponent } from './profile/eventrelatedinfo/generalinfo/generalinfo.component';
import { SkiiInfoComponent } from './profile/eventrelatedinfo/skiiinfo/skiiinfo.component';
import { RunningInfoComponent } from './profile/eventrelatedinfo/runninginfo/runninginfo.component';
import { HikingInfoComponent } from './profile/eventrelatedinfo/hikinginfo/hikinginfo.component';
import { CampingInfoComponent } from './profile/eventrelatedinfo/campinginfo/campinginfo.component';
import { BicyclingInfoComponent } from './profile/eventrelatedinfo/bicyclinginfo/bicyclinginfo.component';
import { OthersInfoComponent } from './profile/eventrelatedinfo/othersinfo/othersinfo.component';
import { GroupInfoComponent } from './profile/groupinfo/groupinfo.component';
import { EventSummaryComponent } from '../event/eventsummary.component';
import { MessageSummaryComponent } from './message/messagesummary.component';
import { UploadSummaryComponent } from './upload/uploadsummary.component';

const userRoutes: Routes = [
  {path: '', component: UserComponent,
    children: [
      {path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
        {path: 'personalinfo', component: PersonalInfoComponent, canDeactivate: [CanDeactivateGuard]},
        {path: 'changepassword', component: ChangePasswordComponent},
        {path: 'eventinfo', component: EventRelatedInfoComponent, children: [
          {path: 'general', component: GeneralInfoComponent},
          {path: 'running', component: RunningInfoComponent},
          {path: 'skii', component: SkiiInfoComponent},
          {path: 'hiking', component: HikingInfoComponent},
          {path: 'camping', component: CampingInfoComponent},
          {path: 'bicyling', component: BicyclingInfoComponent},
          {path: 'others', component: OthersInfoComponent}
        ]},
        {path: 'groupinfo', component: GroupInfoComponent}
      ]},
      {path: 'events', component: EventSummaryComponent},
      {path: 'messages', component: MessageSummaryComponent},
      {path: 'uploads', component: UploadSummaryComponent}
    ]}
]

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule { }
