import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { AuthComponent } from '../core/auth/auth.component';
import { ProfileComponent } from '../features/profile/profile.component';
// import { AuthGuard } from '../core/auth/services/authguard.service';
/**
 * Created by LAE84266 on 15/04/2017.
 */

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: HomeComponent},
  {path: 'auth/:id', component: AuthComponent},
  {path: 'profile/:id', component: ProfileComponent}
  // {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  // { path: 'unauthorized', component: UnauthorizedComponent }
];
