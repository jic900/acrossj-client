/**
 * Created by LAE84266 on 07/08/2017.
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { HttpService } from 'app/shared/services/http.service';
import { EndPoint } from 'app/config/common/endpoint.config';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';

@Injectable()
export class UserService {

  showProfileMenu$: Subject<boolean>;
  profileMenuSelected: ILinkElement;

  constructor(private httpService: HttpService) {
    this.showProfileMenu$ = new Subject<boolean>();
  }

  setMenuOpened(isShow: boolean): void {
    this.showProfileMenu$.next(isShow);
  }

  setProfileMenuSelected(selected: ILinkElement): void {
    this.profileMenuSelected = selected;
  }

  changePassword(changePasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('profile.changePassword'), changePasswordData)
      .map(response => response.json());
  }
}
