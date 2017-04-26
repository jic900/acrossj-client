import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DelayDirective } from './directives/delay.directive';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    DelayDirective,
    AutocompleteComponent
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class SharedModule { }
