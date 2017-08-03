import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpService } from 'app/shared/services/http/http.service';
import { EndPoint } from 'app/config/endpoint.config';

@Injectable()
export class AuthService {

  authenticated: boolean;
  authenticated$: BehaviorSubject<boolean>;

  constructor(private httpService: HttpService) {
    this.authenticated = false;
    this.authenticated$ = new BehaviorSubject<boolean>(this.authenticated);
    if (tokenNotExpired('token')) {
      this.setAuthenticated(true);
    }
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.authenticated = isAuthenticated;
    this.authenticated$.next(isAuthenticated);
  }

  signup(signupData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.signup, signupData)
      .map(response => response.json());
  }

  signin(signinData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.signin, signinData)
      .map(response => {
        const body = response.json();
        localStorage.setItem('user', body.username);
        localStorage.setItem('token', body.token);
        this.setAuthenticated(true);
        return body;
      });
  }

  signout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setAuthenticated(false);
  }

  verifyEmail(verifyEmailData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.verifyEmail, verifyEmailData)
      .map(response => response.json());
  }

  forgotPassword(forgotPasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.forgotPassword, forgotPasswordData)
      .map(response => response.json());
  }

  resetPassword(resetPasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.resetPassword, resetPasswordData)
      .map(response => response.json());
  }

  sendVerifyEmail(sendVerifyEmailData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.sendVerifyEmail, sendVerifyEmailData)
      .map(response => response.json());
  }
}
