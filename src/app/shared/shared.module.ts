import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelayDirective } from './directives/delay.directive';
import { AutoComplete } from './components/autocomplete/autocomplete.component';
import { DateRangePicker } from './components/daterangepicker/daterangepicker.component';
import { FocusDirective } from './components/daterangepicker/directives/daterangepicker.focus.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DelayDirective,
    AutoComplete,
    DateRangePicker,
    FocusDirective
  ],
  exports: [
    AutoComplete,
    DateRangePicker
  ]
})
export class SharedModule {
}
