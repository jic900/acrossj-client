import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { AuthService } from '../services/auth.service';
import { IForm } from 'app/config/interfaces/form.interface';
import { IInputElement } from 'app/config/interfaces/input-element.interface';

@Component({
  selector: 'aj-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['../auth.component.css']
})

export class ResetPasswordComponent implements OnInit {

  @Input() formData: IForm;
  formElements: {};
  inputElements: IInputElement[];
  formGroup: FormGroup;
  processing: boolean;
  message: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.formElements = _.mapKeys(this.formData.elements, 'name');
    this.inputElements = this.formData.elements.filter(element => {
      return element.type === 'input';
    });
    this.message = null;
    this.formGroup = new FormGroup({});
  }

  onResetPassword(event): void {
    event.preventDefault();
    this.processing = true;
    this.message = null;

    this.authService.resetPassword(this.formGroup.value)
      .subscribe(
        data => {
        },
        err => {
        }
      );
  }
}
