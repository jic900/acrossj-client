import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FeaturesModule } from "./features/features.module";

import { AppComponent } from './app.component';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './i18n';

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FeaturesModule
  ],
  providers: [ TRANSLATION_PROVIDERS, TranslateService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
