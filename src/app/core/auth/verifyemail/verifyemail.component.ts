import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AuthConfig } from 'app/config/auth.config';
import { Router } from '@angular/router';

@Component({
  selector: 'aj-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['../auth.component.css']
})

export class VerifyEmailComponent {

  verifyEmailData: {};
  message: string;
  showResendLink: boolean;

  constructor(private authService: AuthService, private router: Router) {
    this.verifyEmailData = AuthConfig.verifyEmail;
  }

  verifyEmail(token: string): void {
    this.message = AuthConfig.verifyEmail.messages.inProgress;
    this.showResendLink = false;
    this.authService.verifyEmail({'token': token})
      .subscribe(
        data => {
          if (data['status'] === 'Verified') {
            this.message = AuthConfig.verifyEmail.messages.success;
          } else if (data['status'] === 'AlreadyVerified') {
            this.message = AuthConfig.verifyEmail.messages.alreadyVerified;
          }
          // TODO: login page selected tab not working
          setTimeout(() => {
            this.router.navigateByUrl('auth/login');
          }, 3000);
        },
        err => {
          console.log(err);
          if (err.name === 'TokenExpired' || err.name === 'InvalidToken' || err.name === 'UserNotFound') {
            this.message = AuthConfig.verifyEmail.messages.failed;
            this.showResendLink = true;
          } else {
            this.message = err.message;
          }
        }
      );
  }
}
