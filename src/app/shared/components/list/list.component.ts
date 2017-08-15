import {
  Component,
  OnInit,
  AfterViewInit,
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

export class ListComponent implements OnInit, AfterViewInit {

  @Input() listData: IListElement;
  @Input() showLine: boolean;
  @Input() showNavIcon: boolean;
  @Output() selected: EventEmitter<ILinkElement | IElement>;
  list: ILinkElement[] | IElement[];
  selectedIndex: number;

  constructor() {
    this.selected = new EventEmitter<ILinkElement | IElement>();
  }

  ngOnInit() {
    this.list = this.listData.list;
  }

  ngAfterViewInit(): void {
    this.selectedIndex = 0;
  }

  onClicked(selectedIndex: number, selectedItem: ILinkElement | IElement): void {
    this.selectedIndex = selectedIndex;
    this.selected.emit(selectedItem);
  }
}
