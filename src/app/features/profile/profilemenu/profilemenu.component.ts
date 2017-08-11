/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'app/features/services/user.service';

@Component({
  selector: 'aj-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrls: ['../profile.component.css']
})

export class ProfileMenuComponent {

  constructor(private userService: UserService, private router: Router) { }

  onPersonalInfoClicked(event): void {
    this.userService.setMenuOpened(false);
    this.router.navigate(['/user/profile/personalinfo']);
  }

  onChangePasswordClicked(event): void {
    this.userService.setMenuOpened(false);
    this.router.navigate(['/user/profile/changepassword']);
  }
}
