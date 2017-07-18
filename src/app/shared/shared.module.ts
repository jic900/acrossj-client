import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Http, RequestOptions } from '@angular/http';
import { LoaderService } from './services/http/loader/loader.service';
import { HttpService } from './services/http/http.service';
import { AuthConfig } from 'angular2-jwt';
import { DateRangePicker } from './components/daterangepicker/daterangepicker.component';
import { DateRangePickerFocusDirective } from './components/daterangepicker/directives/daterangepicker.focus.directive';
import { DropDownComponent } from './components/dropdown/dropdown.component';
import { ValidateOnBlurDirective } from './directives/validate-onblur.directive';

export function httpServiceFactory(http: Http, options: RequestOptions, loaderService: LoaderService) {
  return new HttpService(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true,
  }), http, options, loaderService);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild({}),
  ],
  declarations: [
    DateRangePicker,
    DateRangePickerFocusDirective,
    DropDownComponent,
    ValidateOnBlurDirective
  ],
  exports: [
    TranslateModule,
    DateRangePicker,
    DropDownComponent,
    ValidateOnBlurDirective
  ],
  providers: [
    LoaderService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [Http, RequestOptions, LoaderService]
    }
  ]
})
export class SharedModule {
}
