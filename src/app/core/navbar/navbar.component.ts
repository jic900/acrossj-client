import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('2', style({transform: 'translateX(0)'})),
      state('1', style({transform: 'translateX(-100%)'})),
      transition('1 => 2', animate('500ms ease-in-out')),
      transition('2 => 1', animate('500ms ease-in-out'))
    ]),
  ],
})
export class NavbarComponent {

  state;
  width;
  constructor() {
    this.width = window.innerWidth;
    this.updateState();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.width = event.target.innerWidth;
    console.log('width =>', this.width);
    this.updateState();
  }

  private updateState() {
    if (this.width > 768) {
      this.state = 0;
    } else if (! this.state) {
      this.state = 1;
    }
  }

  toggleState() {
    console.log('toggleState before => this.state === ' + this.state);
    this.state = this.state !== 2 ? 2 : 1;
    console.log('toggleState after => this.state === ' + this.state);
  }

  isCollapsed() {
    return this.state === 1;
  }

  isExpanded() {
    console.log('isExpanded => this.state === ' + this.state);
    return this.state === 2;
  }

  // state;
  // constructor() {
  //   this.state = 1;
  // }
  // toggleState() {
  //   console.log('toggleState before => this.state === ' + this.state);
  //   this.state = this.state === 1 ? 2 : 1;
  //   console.log('toggleState after => this.state === ' + this.state);
  // }
  // isCollapsed() {
  //   return this.state === 1;
  // }
  //
  // isExpanded() {
  //   console.log('isExpanded => this.state === ' + this.state);
  //   return this.state === 2;
  // }
}
