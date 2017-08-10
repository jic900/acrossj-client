/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AppConstant } from 'app/config/app.config';

@Component({
  selector: 'aj-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['../profile.component.css']
})

export class PersonalInfoComponent {

  constructor(private profileService: ProfileService) { }

  onBackClicked(event): void {
    this.profileService.setMenuOpened(true);
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }
}
