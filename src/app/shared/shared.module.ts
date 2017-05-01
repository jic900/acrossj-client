import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelayDirective } from './directives/delay.directive';
import { AutoComplete } from './components/autocomplete/autocomplete.component';
import { DateRangePicker } from './components/daterangepicker/daterangepicker.component';
import { DateRangePickerFocusDirective } from './components/daterangepicker/directives/daterangepicker.focus.directive';
import { DatePicker } from './components/datepicker/datepicker.component';
import { DatePickerFocusDirective } from './components/datepicker/directives/datepicker.focus.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DelayDirective,
    AutoComplete,
    DateRangePicker,
    DateRangePickerFocusDirective,
    DatePicker,
    DatePickerFocusDirective
  ],
  exports: [
    AutoComplete,
    DateRangePicker,
    DatePicker
  ]
})
export class SharedModule {
}
