import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { VerifyEmailConfig } from 'app/config/auth.config';
import { IComponent } from 'app/config/interfaces/component.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';
import { AuthService } from '../services/auth.service';

interface IVerifyEmail {
  sendVerifyEmail: ILinkElement;
  backSignIn: ILinkElement;
}

@Component({
  selector: 'aj-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['../auth.component.css']
})

export class VerifyEmailComponent {

  componentData: IComponent;
  elements: IVerifyEmail;
  message: string;
  showResendLink: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.componentData = new VerifyEmailConfig();
    this.elements = _.mapKeys(this.componentData.elements, 'name');
  }

  verifyEmail(token: string): void {
    this.message = this.componentData.messages['inProgress'];
    this.showResendLink = false;
    this.authService.verifyEmail({'token': token})
      .subscribe(
        data => {
          if (data['status'] === 'Verified') {
            this.message = this.componentData.messages['success'];
          } else if (data['status'] === 'AlreadyVerified') {
            this.message = this.componentData.messages['alreadyVerified'];
          }
          // TODO: login page selected tab not working
          // setTimeout(() => {
          //   this.router.navigateByUrl('/auth/signin');
          // }, 3000);
        },
        err => {
          // console.log(err);
          if (err.name === 'TokenExpired' || err.name === 'InvalidToken' || err.name === 'VerifyToken' || err.name === 'UserNotFound') {
            this.message = this.componentData.errors['failed'];
            this.showResendLink = true;
          } else {
            this.message = err.message;
          }
        }
      );
  }
}
