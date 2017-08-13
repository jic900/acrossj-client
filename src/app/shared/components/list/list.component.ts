import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { IListElement } from 'app/config/interfaces/list-element.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';


@Component({
  selector: 'aj-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  @Input() listData: IListElement;
  @Input() showLine: boolean;
  @Input() showNavIcon: boolean;
  @Output() clicked: EventEmitter<void>;
  list: ILinkElement[] | IElement[];

  constructor() {
    this.clicked = new EventEmitter<void>();
  }

  ngOnInit() {
    this.list = this.listData.list;
  }

  onClicked(event): void {
    this.clicked.emit();
  }
}
