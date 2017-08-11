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

import { AppConstant } from 'app/config/app.config';
import { UserService } from '../services/user.service';

@Component({
  selector: 'aj-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements AfterViewInit, OnDestroy {

  subscription: Subscription;
  showMenu: boolean;

  constructor(private userService: UserService,
              private location: Location,
              private router: Router
  ) {
    this.showMenu = true;
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
    const activeRoute = this.location.path();
    if (width >= AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT && activeRoute.indexOf('personalinfo') === -1) {
      this.router.navigate(['/user/profile/personalinfo']);
    } else if (width < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT && activeRoute.indexOf('personalinfo') !== -1) {
      this.router.navigate(['/user/profile']);
    }
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

