import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthConfig } from 'angular2-jwt';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './features/core/core.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthService } from './features/auth/services/auth.service';
import { LoaderService } from './features/core/loader/loader.service';
import { LocalStorageService } from './shared/services/localstorage.service';
import { HttpService } from './shared/services/http.service';
import { AppRoutingModule } from './app-routing.module';

export function translateLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'src/assets/i18n/', '.json');
}

export function httpServiceFactory(
  http: Http,
  options: RequestOptions,
  loaderService: LoaderService,
  localStorageService: LocalStorageService
) {
  return new HttpService(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true
  }), http, options, loaderService, localStorageService);
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [Http],
      },
      isolate: false
    })
  ],
  providers: [
    AuthService,
    LoaderService,
    LocalStorageService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [Http, RequestOptions, LoaderService, LocalStorageService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'ja', 'zh']);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|ja|zh/) ? browserLang : 'en');
    // translate.use('zh');
  }
}
