import { Injectable } from '@angular/core';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable, TimeoutError } from 'rxjs';
import { LoaderService } from 'app/shared/components/loader/loader.service';
import { AuthService } from 'app/core/auth/services/auth.service';
import { AppConfig } from 'app/config/app.config';
import { EndPointBase } from 'app/config/endpoint.config';

const ERR_CONNECTION_REFUSED = 0;
const ERR_SYSTEM_UNAVAILABLE = 503;
const ERR_GATEWAY_TIMEOUT = 504;
const ERR_UNAUTHORIZED = 401;

@Injectable()
export class HttpService extends AuthHttp {

  constructor(
    options: AuthConfig,
    http: Http,
    defaultOptions: RequestOptions,
    private loaderService: LoaderService,
    private authService: AuthService) {

    super(options, http, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(this.getFullUrl(url), options));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(this.getFullUrl(url), body, options));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(this.getFullUrl(url), body, options));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.delete(this.getFullUrl(url), options));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.patch(this.getFullUrl(url), body, options));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.head(this.getFullUrl(url), options));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.options(this.getFullUrl(url), options));
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

  private getFullUrl(url: string): string {
    return EndPointBase + url;
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
    // } else if (error.status === ERR_UNAUTHORIZED && (error.name === 'TokenExpired' || error.name === 'InvalidToken')) {
    //   this.authService.refreshToken();
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

  // private onRetry(error: any): Observable<any> {
  //   console.log(error);
  //   return error.delay(AppConfig.HTTP_RETRY_DELAY);
  // }
}
