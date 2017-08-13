import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { AppConfig } from 'app/config/common/app.config';
import { AppConstant } from 'app/config/common/app-constant.config';
import { UserConfig } from 'app/config/user/user.config';
import { IComponent } from 'app/config/interfaces/component.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

interface IUser {
  dashboard: ILinkElement;
  profile: ILinkElement;
  events: ILinkElement;
  messages: ILinkElement;
  uploads: ILinkElement;
}

@Component({
  selector: 'aj-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  userData: IComponent;
  userElements: IUser;
  tabLinks: ILinkElement[];
  lastClicked: string;
  backgroundImage = AppConfig.USER_BACKGROUND;

  constructor(private router: Router) {
    this.userData = new UserConfig();
    this.userElements = _.mapKeys(this.userData.elements, 'name');
    this.tabLinks = this.userData.elements.filter((element) => {
      return element.type === 'link';
    })
  }

  onClicked(element): void {
    if (this.isDeviceWidth()) {
      if (element === this.userElements.profile.name) {
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
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }
}
