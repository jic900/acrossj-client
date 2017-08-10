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
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './config/routes.config';
import { AuthService } from './core/auth/services/auth.service';
import { LoaderService } from './core/loader/loader.service';
import { LocalStorageService } from './core/services/localstorage.service';
import { HttpService } from './core/services/http.service';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [Http],
      },
      isolate: false
    }),
    RouterModule.forRoot(AppRoutes),
    // RouterModule.forRoot(AppRoutes, {useHash: true, preloadingStrategy: PreloadAllModules}),
    SharedModule,
    CoreModule,
    FeaturesModule
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
