import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelayDirective } from './directives/delay.directive';
import { DateRangePicker } from './components/daterangepicker/daterangepicker.component';
import { DateRangePickerFocusDirective } from './components/daterangepicker/directives/daterangepicker.focus.directive';
import { DatePicker } from './components/datepicker/datepicker.component';
import { DatePickerFocusDirective } from './components/datepicker/directives/datepicker.focus.directive';
import { DropDownComponent } from './components/dropdown/dropdown.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DelayDirective,
    DateRangePicker,
    DateRangePickerFocusDirective,
    DatePicker,
    DatePickerFocusDirective,
    DropDownComponent
  ],
  exports: [
    DateRangePicker,
    DatePicker,
    DropDownComponent
  ]
})
export class SharedModule {
}
