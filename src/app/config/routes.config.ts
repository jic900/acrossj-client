import {Routes} from "@angular/router";
import {HomeComponent} from "../features/home/home.component";
import {LoginComponent} from "../core/auth/login.component";
/**
 * Created by LAE84266 on 15/04/2017.
 */

export const AppRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
];
