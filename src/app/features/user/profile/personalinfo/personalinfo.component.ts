/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import * as _ from 'lodash';

import { PersonalInfoConfig } from 'app/config/user/profile/personalinfo.config';
import { UserService } from 'app/features/user/services/user.service';
import { AppConstant } from 'app/config/common/app-constant.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';
import { IListElement } from 'app/config/interfaces/list-element.interface';
import { IMessageElement } from 'app/config/interfaces/message-element';

interface IPersonalInfo {
  fullname: IInputElement;
  username: IInputElement;
  gender: IListElement;
  birthday: IInputElement;
  adress: IInputElement;
  postcode: IInputElement;
  phonenumber: IInputElement;
  saveButton: IElement;
}

interface IPersonalInfoMessage {
}

@Component({
  selector: 'aj-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['../profile.component.css']
})

export class PersonalInfoComponent {

  formData: IForm;
  formElements: IPersonalInfo;
  messages: IPersonalInfoMessage;
  formGroup: FormGroup;
  message: IMessageElement;
  processing: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.formData = new PersonalInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.messages = _.mapKeys(this.formData.messages, 'name');
    this.formGroup = new FormGroup({});
    this.message = null;
    this.processing = false;
  }

  isValid(): boolean {
    return this.formGroup.valid && !this.processing;
  }

  onClicked(event): void {
    this.message = null;
  }

  onBindControl(controlData: {}): void {
    this.formGroup.addControl(controlData['name'], controlData['control']);
  }

  onBackClicked(event): void {
    this.userService.setMenuOpened(true);
    this.router.navigate(['/user/profile']);
  }

  onSelected(event): void {
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.PROFILE_TOGGLE_BREAKPOINT;
  }
}
