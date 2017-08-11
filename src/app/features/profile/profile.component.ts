/**
 * Created by LAE86643 on 8/6/2017.
 */

import {
  Component,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import { AppConstant } from 'app/config/app.config';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'aj-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements AfterViewInit, OnDestroy {

  subscription: any;
  profileState: string;
  showMenu: boolean;

  constructor(private profileService: ProfileService, private router: Router) {
    this.showMenu = true;
    this.subscription = this.profileService.menuOpened$.subscribe(isMenuOpened => this.showMenu = isMenuOpened);
  }

  ngAfterViewInit(): void {
    if (! this.isDeviceWidth()) {
      this.router.navigate(['/user/profile/personalinfo']);
    }
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

