/**
 * Created by LAE84266 on 13/06/2017.
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if (!this.auth.authenticated) {
      this.router.navigate(['']);
      // this.router.navigate(['unauthorized']);
      return false;
    }
    return true;
  }
}
