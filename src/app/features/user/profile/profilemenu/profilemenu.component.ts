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
import { ILinkElement } from 'app/config/interfaces/link-element.interface';
import { IListItem } from 'app/config/interfaces/list-item';

interface IProfileMenu {
  menuTitle: IElement;
  menuList: IListElement;
}

@Component({
  selector: 'aj-profilemenu',
  templateUrl: './profilemenu.component.html',
  styleUrls: ['./profilemenu.component.css']
})

export class ProfileMenuComponent {

  menuData: IComponent;
  menuElements: IProfileMenu;

  constructor(private userService: UserService) {
    this.menuData = new ProfileMenuConfig();
    this.menuElements = _.mapKeys(this.menuData.elements, 'name');
    this.userService.setProfileMenuSelected(<ILinkElement>this.menuElements.menuList.list[0]);
  }

  onSelected(selectedItem: IListItem): void {
    this.userService.setMenuOpened(false);
    this.userService.setProfileMenuSelected(<ILinkElement>selectedItem);
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }
}
