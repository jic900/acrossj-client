/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from 'app/features/auth/services/authguard.service';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { CustomPreloadingStrategy } from './custom-preloading-strategy';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'auth',
    loadChildren: 'app/features/auth/auth.module#AuthModule',
    data: {preload: true}
  },
  {
    path: 'user',
    loadChildren: 'app/features/user/user.module#UserModule',
    data: {preload: true}
  },
  {
    path: 'event',
    loadChildren: 'app/features/event/event.module#EventModule',
    data: {preload: true}
  },
  // {
  //   path: 'admin',
  //   loadChildren: 'app/admin/admin.module#AdminModule',
  //   canLoad: [AuthGuard]
  // },

  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}

  // {path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  // { path: 'unauthorized', component: UnauthorizedComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: CustomPreloadingStrategy})
    // RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    CustomPreloadingStrategy
  ]
})
export class AppRoutingModule { }
