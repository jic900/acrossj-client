import { Injectable } from '@angular/core';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader/loader.service';
import { AppConfig } from 'app/config/app.config';
import { EndPointBase } from 'app/config/endpoint.config';

@Injectable()
export class HttpService extends AuthHttp {

  constructor(
    options: AuthConfig,
    http: Http,
    defaultOptions: RequestOptions,
    private loaderService: LoaderService
  ) {
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
    this.showLoader();
    return observable
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      // .retry(AppConfig.HTTP_RETRY_MAX)
      .retryWhen(this.onRetry)
      .timeoutWith(AppConfig.HTTP_TIMEOUT, this.onTimeout)
      .finally(() => {
        this.onFinally();
      });

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

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }

  private onSuccess(res: Response): void {
    // console.log('Request successful');
  }

  private onError(res: Response): void {
    // console.log('Error, status code: ' + res.status);
  }

  private onRetry(error: any): Observable<any> {
    return error.delay(AppConfig.HTTP_RETRY_DELAY);
  }

  private onTimeout(): void {
    Observable.throw(new Error('delay exceeded'));
  }

  private onFinally(): void {
    this.hideLoader();
  }
}
