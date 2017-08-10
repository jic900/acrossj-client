/**
 * Created by LAE84266 on 07/08/2017.
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HttpService } from 'app/core/services/http.service';
import { EndPoint } from 'app/config/endpoint.config';

@Injectable()
export class ProfileService {

  menuOpened$: Subject<boolean>;

  constructor(private httpService: HttpService) {
    this.menuOpened$ = new Subject<boolean>();
  }

  setMenuOpened(isOpen: boolean): void {
    this.menuOpened$.next(isOpen);
  }

  changePassword(changePasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('profile.changePassword'), changePasswordData)
      .map(response => response.json());
  }

}
