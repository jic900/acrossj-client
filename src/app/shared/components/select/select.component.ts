import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { IElement } from 'app/config/interfaces/element.interface';
import { IListElement } from 'app/config/interfaces/list-element.interface';

@Component({
  selector: 'aj-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})

export class SelectComponent implements OnInit {

  @Input() inputData: IListElement;
  @Input() required: boolean;
  @Output() bindControl: EventEmitter<{}>;
  @Output() selected: EventEmitter<IElement>;
  selectedValue: string;
  formControl: FormControl;

  constructor() {
    this.required = false;
    this.bindControl = new EventEmitter<{}>();
    this.selected = new EventEmitter<IElement>();
  }

  ngOnInit() {
    const validators = this.required ? [Validators.required] : [];
    this.formControl = new FormControl('', validators);
    this.bindControl.emit({'name': this.inputData.name, 'control': this.formControl});
  }

  onChange(event): void {
    const selectedElement: IElement = (<IElement[]>this.inputData.list).filter(element => {
      return element.name === this.selectedValue;
    })[0];
    this.selected.emit(selectedElement);
  }
}
