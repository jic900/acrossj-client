import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppConfig } from 'app/config/app.config';

@Component({
  selector: 'aj-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('menuInOut', [
      state('2', style({transform: 'translateX(0)'})),
      state('1', style({transform: 'translateX(-100%)'})),
      transition('1 => 2', animate('500ms ease-in-out')),
      transition('2 => 1', animate('500ms ease-in-out'))
    ]),
    // trigger('subMenuInOut', [
    //   state('2', style({transform: 'translateY(0)'})),
    //   state('1', style({transform: 'translateY(-2em)'})),
    //   transition('* => 2', animate('500ms ease-in-out')),
    //   transition('2 => 1', animate('500ms ease-in-out'))
    // ]),
  ],
})

export class NavbarComponent {

  homeLogo = AppConfig.HOME_LOGO;
  menuState;
  subMenuState;
  width;
  constructor() {
    this.width = window.innerWidth;
    this.updateStates();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.width = event.target.innerWidth;
    console.log('width =>', this.width);
    this.updateStates();
  }

  private updateStates() {
    if (this.width > 768) {
      this.menuState = 0;
      this.subMenuState = 0;
    } else if (! this.menuState) {
      this.menuState = 1;
      this.subMenuState = 1;
    }
  }

  toggleMenuState() {
    console.log('toggleMenuState before => this.menuState === ' + this.menuState);
    if (this.menuState === 2 && this.subMenuState === 2) {
      this.subMenuState = 1;
    }
    this.menuState = this.menuState !== 2 ? 2 : 1;
    console.log('toggleMenuState after => this.menuState === ' + this.menuState);
  }
  isMenuCollapsed() {
    console.log('isMenuCollapsed => this.menuState === ' + this.menuState);
    return this.menuState === 1;
  }
  isMenuExpanded() {
    console.log('isMenuExpanded => this.menuState === ' + this.menuState);
    return this.menuState === 2;
  }

  toggleSubMenuState() {
    console.log('toggleSubMenuState before => this.subMenuState === ' + this.subMenuState);
    this.subMenuState = this.subMenuState !== 2 ? 2 : 1;
    console.log('toggleSubMenuState after => this.subMenuState === ' + this.subMenuState);
  }
  isSubMenuCollapsed() {
    console.log('isSubMenuCollapsed => this.subMenuState === ' + this.subMenuState);
    return this.subMenuState === 1;
  }
  isSubMenuExpanded() {
    console.log('isSubMenuExpanded => this.subMenuState === ' + this.subMenuState);
    return this.subMenuState === 2;
  }

  // state;
  // constructor() {
  //   if (window.innerWidth > 768) {
  //     this.state = 0;
  //   } else {
  //     this.state = 1;
  //   }
  // }
  //
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
