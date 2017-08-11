/**
 * Created by LAE86643 on 8/6/2017.
 */

import {
  Component,
  AfterViewInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { Location } from '@angular/common';
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

  constructor(private userService: UserService,
              private location: Location,
              private router: Router
  ) {
    this.showMenu = true;
    this.deviceMode = this.isDeviceWidth();
    this.subscription = this.userService.menuOpened$.subscribe(isMenuOpened => this.showMenu = isMenuOpened);
  }

  ngAfterViewInit(): void {
    if (! this.isDeviceWidth()) {
      this.router.navigate(['/user/profile/personalinfo']);
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event): void {
    const width = event.target.innerWidth;
    const activeRouteParts = this.location.path().split('/');
    const curRoute = activeRouteParts[activeRouteParts.length-1];
    if (width >= AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT && curRoute === 'profile') {
      this.router.navigate(['/user/profile/personalinfo']);
    } else if (width < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT && !this.deviceMode) {
      this.userService.setMenuOpened(true);
      this.router.navigate(['/user/profile']);
    }
    this.deviceMode = width < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

