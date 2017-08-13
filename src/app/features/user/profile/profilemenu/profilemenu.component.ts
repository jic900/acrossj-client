/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component } from '@angular/core';
import * as _ from 'lodash';

import { AppConstant } from 'app/config/common/app-constant.config';
import { UserService } from 'app/features/user/services/user.service';
import { ProfileMenuConfig } from 'app/config/user/profile/profilemenu.config';
import { IComponent } from 'app/config/interfaces/component.interface';
import { IListElement } from 'app/config/interfaces/list-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';

interface IProfileMenu {
  menuTitle: IElement;
  menuList: IListElement;
}

@Component({
  selector: 'aj-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrls: ['../profile.component.css']
})

export class ProfileMenuComponent {

  menuData: IComponent;
  menuElements: IProfileMenu;

  constructor(private userService: UserService) {
    this.menuData = new ProfileMenuConfig();
    this.menuElements = _.mapKeys(this.menuData.elements, 'name');
  }

  onClicked(event): void {
    this.userService.setMenuOpened(false);
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }
}
