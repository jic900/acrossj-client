/**
 * Created by LAE86643 on 8/6/2017.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from "@angular/forms";
import * as _ from 'lodash';

import { ProfileService } from '../services/profile.service';
import { AppConstant } from 'app/config/app.config';
import { PersonalInfoConfig } from 'app/config/profile.config';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';


interface IPersonalInfo {
  fullname: IInputElement;
  username: IInputElement;
  // gender: IElement;
  // birthday: IElement;
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
  formGroup: FormGroup;
  message: IPersonalInfoMessage;
  processing: boolean;

  constructor(private profileService: ProfileService, private router: Router) {
    this.formData = new PersonalInfoConfig();
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.formGroup = new FormGroup({});
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
    this.profileService.setMenuOpened(true);
    this.router.navigate(['/user/profile']);
  }

  isDeviceWidth(): boolean {
    return window.innerWidth < AppConstant.BOOTSTRAP_TOGGLE_BREAKPOINT;
  }
}
