import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MdInputModule, MdSelectModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { DateRangePicker } from './components/daterangepicker/daterangepicker.component';
import { DateRangePickerFocusDirective } from './components/daterangepicker/directives/daterangepicker.focus.directive';
import { DropDownComponent } from './components/dropdown/dropdown.component';
import { ValidateOnBlurDirective } from './directives/validate-onblur.directive';
import { InputComponent } from './components/input/input.component';
import { MessageComponent } from './components/message/message.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MdInputModule,
    MdSelectModule,
    TranslateModule.forChild({}),
  ],
  declarations: [
    DateRangePicker,
    DateRangePickerFocusDirective,
    DropDownComponent,
    ValidateOnBlurDirective,
    InputComponent,
    MessageComponent,
    SelectComponent
  ],
  exports: [
    TranslateModule,
    DateRangePicker,
    DropDownComponent,
    ValidateOnBlurDirective,
    InputComponent,
    MessageComponent,
    SelectComponent
  ],
  providers: []
})

export class SharedModule {
}
