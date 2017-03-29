import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[ajDropdown]'
})

export class DropdownDirective {

  private isOpen = false;

  constructor() { }

  @HostBinding('class.open') get opened() {
    return this.isOpen;
  }

  @HostListener('click') open() {
    this.isOpen = this.isOpen === false ? true : false;
  }

  @HostListener('mouseleave') close() {
    this.isOpen=false;
  }
}
