import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { AuthComponent } from '../core/auth/auth.component';
import { UserComponent } from '../features/user/user.component';
import { ProfileComponent } from '../features/profile/profile.component';
import { PersonalInfoComponent } from '../features/profile/personalinfo/personalinfo.component';
import { ChangePasswordComponent } from '../features/profile/changepassword/changepassword.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { EventSummaryComponent } from '../features/event/eventsummary.component';
import { MessageSummaryComponent } from '../features/message/messagesummary.component';
import { UploadSummaryComponent } from '../features/upload/uploadsummary.component';


// import { AuthGuard } from '../core/auth/services/authguard.service';
/**
 * Created by LAE84266 on 15/04/2017.
 */

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', redirectTo: '/auth/signin', pathMatch: 'full'},
  {path: 'auth/:id', component: AuthComponent},
  {path: 'user', component: UserComponent,
    children: [
      {path: '', redirectTo: '/user/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent, children: [
        {path: 'personalinfo', component: PersonalInfoComponent},
        {path: 'changepassword', component: ChangePasswordComponent},
      ]},
      {path: 'events', component: EventSummaryComponent},
      {path: 'messages', component: MessageSummaryComponent},
      {path: 'uploads', component: UploadSummaryComponent},
    ]},
  // {path: 'user', component: UserComponent},
  // {path: 'user', redirectTo: '/user/profile'},
  // {path: 'user/:id', component: AuthComponent},
  // {path: 'profile/:id', component: ProfileComponent}
  // {path: '404', component: NotFoundComponent},
  // {path: '**', redirectTo: '/404'}
  // {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  // { path: 'unauthorized', component: UnauthorizedComponent }
];



// <div class="layout">
// <div class="page-header">
//   //first outlet to load required component
//   <router-outlet name='child1'></router-outlet>
// </div>
// <div class="content">
//   //second outlet to load required component
//   <router-outlet name='child2'></router-outlet>
//   </div>
//   </div>
//
// {
//   path: 'home',  // you can keep it empty if you do not want /home
//     component: 'appComponent',
//   children: [
//   {
//     path: '',
//     component: childOneComponent,
//     outlet: 'child1'
//   },
//   {
//     path: '',
//     component: childTwoComponent,
//     outlet: 'child2'
//   }
// ]
// }
