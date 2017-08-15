import { Component, Input } from '@angular/core';

import { AppConstant } from 'app/config/common/app-constant.config';
import { UserService } from 'app/features/user/services/user.service';
import { ProfileDetailConfig } from 'app/config/user/profile/profiledetail.config';
import { IComponent } from 'app/config/interfaces/component.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

@Component({
  selector: 'aj-profiledetail',
  templateUrl: './profiledetail.component.html',
  styleUrls: ['./profiledetail.component.css']
})
export class ProfileDetailComponent {

  @Input() title: string;
  backLink: ILinkElement;

  constructor(private userService: UserService) {
    const detailData: IComponent = new ProfileDetailConfig();
    this.backLink = detailData.elements[0];
  }

  onBackLinkClicked(event): void {
    this.userService.setMenuOpened(true);
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }
}
