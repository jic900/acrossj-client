import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { AppRoutes } from './config/routes.config';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';


export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'src/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http],
      },
      isolate: false
    }),
    RouterModule.forRoot(AppRoutes),
    CoreModule,
    FeaturesModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(private translate: TranslateService) {

    translate.addLangs(['en', 'ja', 'zh']);
    translate.setDefaultLang('en');

    let browserLang = translate.getBrowserLang();
    // translate.use('en');
    translate.use(browserLang.match(/en|ja|zh/) ? browserLang : 'en');
  }
}
