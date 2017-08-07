/**
 * Created by LAE86643 on 8/6/2017.
 */

import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aj-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements AfterViewInit, OnDestroy {

  subscription: any;
  profileState: string;

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.profileState = params['id'];
      switch (this.profileState) {
        case 'changepassword': {
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

