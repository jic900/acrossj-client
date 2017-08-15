/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { PersonalInfoComponent } from './profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from './profile/changepassword/changepassword.component';
import { EventSummaryComponent } from '../event/eventsummary.component';
import { MessageSummaryComponent } from './message/messagesummary.component';
import { UploadSummaryComponent } from './upload/uploadsummary.component';
import { CanDeactivateGuard } from 'app/can-deactivate-guard.service';
import { AuthGuard } from '../auth/services/authguard.service';

const userRoutes: Routes = [
  {path: '', component: UserComponent,
    children: [
      {path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], children: [
        {path: 'personalinfo', component: PersonalInfoComponent, canDeactivate: [CanDeactivateGuard]},
        {path: 'changepassword', component: ChangePasswordComponent},
        // {path: 'sportinfo', redirectTo: '/user/sportinfo/general', pathMatch: 'full'},
        // {path: 'sportinfo/general', component: ChangePasswordComponent},
        // {path: 'sportinfo/skii', component: ChangePasswordComponent},
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
