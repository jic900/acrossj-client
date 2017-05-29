import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { AuthComponent } from '../core/auth/auth.component';
/**
 * Created by LAE84266 on 15/04/2017.
 */

export const AppRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'signin', component: AuthComponent},
  {path: 'signup', component: AuthComponent}
];
