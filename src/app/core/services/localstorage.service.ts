import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

@Injectable()
export class LocalStorageService {

  jwtHelper: JwtHelper;

  constructor() {
    this.jwtHelper = new JwtHelper();
  }

  tokenNotExpired(): boolean {
    return tokenNotExpired('token');
  }

  tokenExistsAndExpired(): boolean {
    return localStorage.getItem('token') && !tokenNotExpired('token');
  }

  get(itemName: string): string {
    return localStorage.getItem(itemName);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    const decodedToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('username', decodedToken.username);
    localStorage.setItem('role', decodedToken.role);
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }
}
