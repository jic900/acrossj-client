import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
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

  refreshToken(): void {

  }

  signup(signupData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.signup, signupData)
      .map(response => response.json());
  }

  signin(signinData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.signin, signinData)
      .map(response => {
        const body = response.json();
        const decodedToken = new JwtHelper().decodeToken(body.token);
        localStorage.setItem('token', body.token);
        localStorage.setItem('username', decodedToken.username);
        localStorage.setItem('role', decodedToken.role);
        this.setAuthenticated(true);
        return body;
      });
  }

  signout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
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
