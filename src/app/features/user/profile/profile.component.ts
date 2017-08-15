/**
 * Created by LAE86643 on 8/6/2017.
 */

import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppConstant } from 'app/config/common/app-constant.config';
import { UserService } from '../services/user.service';

@Component({
  selector: 'aj-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements AfterViewInit, OnDestroy {

  subscription: Subscription;
  showMenu: boolean;
  deviceMode: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.showMenu = true;
    this.deviceMode = this.isDeviceWidth();
    this.subscription = this.userService.showProfileMenu$.subscribe(isShow => this.showMenu = isShow);
  }

  ngAfterViewInit(): void {
    if (! this.isDeviceWidth()) {
      this.router.navigate(['/user/profile/personalinfo']);
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const width = event.target.innerWidth;
    if (width < AppConstant.PROFILE_TOGGLE_BREAKPOINT && !this.deviceMode) {
      this.userService.setMenuOpened(true);
      this.router.navigate(['/user/profile']);
    } else if (width >= AppConstant.PROFILE_TOGGLE_BREAKPOINT && this.deviceMode) {
      this.router.navigate([this.userService.profileMenuSelected.link.path]);
    }
    this.deviceMode = width < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

