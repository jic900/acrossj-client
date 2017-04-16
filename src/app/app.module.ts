import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FeaturesModule } from "./features/features.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './i18n';
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./config/routes.config";


@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FeaturesModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [ TRANSLATION_PROVIDERS, TranslateService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
