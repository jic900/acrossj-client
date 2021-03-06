import { Injectable } from '@angular/core';
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Request,
  Response
} from '@angular/http';
import { Observable, TimeoutError } from 'rxjs';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

import { AppConfig } from 'app/config/common/app.config';
import { EndPoint } from 'app/config/common/endpoint.config';
import { LocalStorageService } from './localstorage.service';
import { LoaderService } from 'app/features/core/loader/loader.service';

const ERR_CONNECTION_REFUSED = 0;
const ERR_SYSTEM_UNAVAILABLE = 503;
const ERR_GATEWAY_TIMEOUT = 504;
const ERR_UNAUTHORIZED = 401;

@Injectable()
export class HttpService extends AuthHttp {

  refreshingToken: boolean;

  constructor(
    options: AuthConfig,
    http: Http,
    defaultOptions: RequestOptions,
    private loaderService: LoaderService,
    private localStorageService: LocalStorageService
  ) {
    super(options, http, defaultOptions);
    this.refreshingToken = false;
  }

  refreshToken(): Observable<{}> {
    const reqBody = {'username': this.localStorageService.get('username')};
    this.refreshingToken = true;
    return this.post(EndPoint.getUrl('auth.refreshToken'), reqBody)
      .map(response => response.json())
      .map(data => {
        this.localStorageService.saveToken(data.token);
        this.refreshingToken = false;
        return data;
      })
      .catch(err => {
        this.localStorageService.deleteToken();
        this.refreshingToken = false;
        return Observable.throw(err);
      });
  }

  request(request: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (this.localStorageService.tokenExistsAndExpired() && !this.refreshingToken) {
      return this.refreshToken().flatMap(data => this.intercept(super.request(request, options)));
    } else {
      return this.intercept(super.request(request, options));
    }
  }

  private intercept(observable: Observable<Response>): Observable<Response> {
    this.loaderService.show();
    return observable
      // .do((res: Response) => {
      //   this.onSuccess(res);
      // }, (error: any) => {
      //   this.onError(error);
      // })
      .timeout(AppConfig.HTTP_TIMEOUT)
      // .retry(AppConfig.HTTP_RETRY_MAX)
      .retryWhen(this.onRetry)
      // .timeoutWith(AppConfig.HTTP_TIMEOUT, this.onTimeout)
      // .timeoutWith(1000, this.onTimeout())
      .catch(this.onCatch)
      .finally(() => this.loaderService.hide());

    // return observable.catch((err, source) => {
    //   if (err.status  == 401 && !_.endsWith(err.url, 'api/auth/login')) {
    //     this._router.navigate(['/login']);
    //     return Observable.empty();
    //   } else {
    //     return Observable.throw(err);
    //   }
    // });
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    if (error.status === ERR_CONNECTION_REFUSED) {
      error.name = 'SystemUnavailable';
      error.status = ERR_SYSTEM_UNAVAILABLE;
      error.message = AppConfig.ERROR.SYSTEM_UNAVAILABLE;
    } else if (error instanceof TimeoutError) {
      error = {
        name: 'GatewayTimeout',
        status: ERR_GATEWAY_TIMEOUT,
        message: AppConfig.ERROR.GATEWAY_TIMEOUT
      }
    } else if (error.status === ERR_UNAUTHORIZED && (error.name === 'TokenExpired' || error.name === 'InvalidToken')) {
      this.localStorageService.deleteToken();
      // this.authService.refreshToken();
    } else {
      error = error.json();
      if (!error.name) {
        error.name = 'Unexpected';
      }
      if (error.name !== 'Validation') {
        error.message = AppConfig.ERROR.GENERIC;
      }
    }
    // console.log(error);
    return Observable.throw(error);
  }

  // private onSuccess(res: Response): void {
  //   console.log('Request successful');
  // }
  //
  // private onError(res: Response): void {
  //   console.log(res);
  //   console.log('Error, status code: ' + res.status);
  // }

  private onRetry = attempts => {
    // console.log('retryWhen callback');
    let count = 0;
    return attempts.flatMap(error => {
      if (error instanceof TimeoutError) {
        console.log('retrying');
        return ++count >= AppConfig.HTTP_RETRY_MAX ? Observable.throw(error) : Observable.timer(count * AppConfig.HTTP_RETRY_DELAY);
      }
      return Observable.throw(error);
    });
  }
}
