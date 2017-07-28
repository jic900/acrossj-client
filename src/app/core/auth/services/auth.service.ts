import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { HttpService } from 'app/shared/services/http/http.service';
import { EndPoint } from 'app/config/endpoint.config';
import { IHttpResponse } from 'app/shared/interfaces/httpresponse.interface';

@Injectable()
export class AuthService {

  authenticated: boolean;
  authenticated$: BehaviorSubject<boolean>;

  constructor(private httpService: HttpService, private router: Router) {
    this.authenticated = false;
    this.authenticated$ = new BehaviorSubject<boolean>(this.authenticated);
    if (tokenNotExpired('token')) {
      this.authenticated = true;
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
      .map(response => response.json());
  }

  verifyEmail(verifyEmailData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.auth.verifyEmail, verifyEmailData)
      .map(response => response.json());
  }

  // login() {
  //   // Auth0 authorize request
  //   // Note: nonce is automatically generated: https://auth0.com/docs/libraries/auth0js/v8#using-nonce
  //   this.auth0.authorize({
  //     responseType: 'token id_token',
  //     redirectUri: AUTH_CONFIG.REDIRECT,
  //     audience: AUTH_CONFIG.AUDIENCE,
  //     scope: AUTH_CONFIG.SCOPE
  //   });
  // }
  //
  // handleAuth() {
  //   // When Auth0 hash parsed, get profile
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       window.location.hash = '';
  //       this._getProfile(authResult);
  //       this.router.navigate(['/']);
  //     } else if (err) {
  //       this.router.navigate(['/']);
  //       console.error(`Error: ${err.error}`);
  //     }
  //   });
  // }
  //
  // private _getProfile(authResult) {
  //   // Use access token to retrieve user's profile and set session
  //   this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
  //     this._setSession(authResult, profile);
  //   });
  // }
  //
  // private _setSession(authResult, profile) {
  //   // Save session data and update login status subject
  //   localStorage.setItem('token', authResult.accessToken);
  //   localStorage.setItem('id_token', authResult.idToken);
  //   localStorage.setItem('profile', JSON.stringify(profile));
  //   this.setLoggedIn(true);
  // }

  signout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
    this.setAuthenticated(false);
  }
}
