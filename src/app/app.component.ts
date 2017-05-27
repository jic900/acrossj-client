import { Component } from '@angular/core';

@Component({
  selector: 'aj-root',
  // template: `<aj-home></aj-home>`
  template: `
    <aj-navbar></aj-navbar>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
