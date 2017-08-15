import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { UserService } from 'app/features/user/services/user.service';
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
  backgroundImage: string;

  constructor(private userService: UserService, private router: Router) {
    this.userData = new UserConfig();
    this.userElements = _.mapKeys(this.userData.elements, 'name');
    this.tabLinks = this.userData.elements.filter((element) => {
      return element.type === 'link';
    })
    this.backgroundImage = AppConfig.USER_BACKGROUND;
  }

  getProfileLink(): string {
    if (this.isDeviceWidth()) {
      return '/user/profile';
    } else if (this.userService.profileMenuSelected) {
      return this.userService.profileMenuSelected.link.path;
    } else {
      return '/user/profile/personalinfo';
    }
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }
}
