/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'aj-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrls: ['../profile.component.css']
})

export class ProfileMenuComponent {

  constructor(private profileService: ProfileService, private router: Router) { }

  onPersonalInfoClicked(event): void {
    this.profileService.setMenuOpened(false);
    this.router.navigate(['/user/profile/personalinfo']);
  }

  onChangePasswordClicked(event): void {
    this.profileService.setMenuOpened(false);
    this.router.navigate(['/user/profile/changepassword']);
  }
}
