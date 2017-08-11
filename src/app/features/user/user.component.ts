import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppConstant } from 'app/config/app.config';

@Component({
  selector: 'aj-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent {

  lastClicked: string;

  constructor(private router: Router) {
  }

  onClicked(element): void {
    if (this.isDeviceWidth()) {
      if (element === 'profile') {
        this.router.navigate(['/user/profile']);
      }
    } else {
      if (this.lastClicked !== 'profile' && element === 'profile') {
        this.router.navigate(['/user/profile/personalinfo']);
      }
      this.lastClicked = element;
    }
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }
}
