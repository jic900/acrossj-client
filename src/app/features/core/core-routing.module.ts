/**
 * Created by LAE84266 on 11/08/2017.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'app/features/core/home/home.component';

const coreRoutes: Routes = [
  {path: 'home', component: HomeComponent},
]

@NgModule({
  imports: [
    RouterModule.forChild(coreRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CoreRoutingModule { }
