import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    DashboardComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class FeaturesModule {
}
