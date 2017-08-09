/**
 * Created by LAE84266 on 07/08/2017.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from 'app/core/services/http.service';
import { EndPoint } from 'app/config/endpoint.config';

@Injectable()
export class ProfileService {

  constructor(private httpService: HttpService) {}

  changePassword(changePasswordData: {}): Observable<{}> {
    return this.httpService.post(EndPoint.getUrl('profile.changePassword'), changePasswordData)
      .map(response => response.json());
  }

}
