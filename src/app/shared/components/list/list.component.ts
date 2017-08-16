import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { IListElement } from 'app/config/interfaces/list-element.interface';
import { IListItem } from 'app/config/interfaces/list-item';
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
  @Output() selected: EventEmitter<IListItem>;
  list: IListItem[];
  selectedIndex: number;

  constructor() {
    this.showLine = false;
    this.selected = new EventEmitter<IListItem>();
  }

  ngOnInit() {
    // this.list = this.listData.list;
    this.list = [];
    this.listData.list.forEach((listElement) => {
      this.list.push(listElement);
      if ('list' in listElement) {
        (<IListElement>listElement).list.forEach(sublistElement => {
          this.list.push(sublistElement);
        })
      }
    });
  }

  ngAfterViewInit(): void {
    this.selectedIndex = 0;
  }

  onClicked(selectedIndex: number, selectedItem: IListItem): void {
    this.selectedIndex = selectedIndex;
    this.selected.emit(selectedItem);
  }
}
