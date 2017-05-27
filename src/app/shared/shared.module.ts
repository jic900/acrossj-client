import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DelayDirective } from './directives/delay.directive';
import { DateRangePicker } from './components/daterangepicker/daterangepicker.component';
import { DateRangePickerFocusDirective } from './components/daterangepicker/directives/daterangepicker.focus.directive';
import { DatePicker } from './components/datepicker/datepicker.component';
import { DatePickerFocusDirective } from './components/datepicker/directives/datepicker.focus.directive';
import { DropDownComponent } from './components/dropdown/dropdown.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    TranslateModule.forChild({}),
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
    TranslateModule,
    DateRangePicker,
    DatePicker,
    DropDownComponent
  ]
})
export class SharedModule {
}
