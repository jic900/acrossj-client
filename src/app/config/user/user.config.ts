/**
 * Created by LAE84266 on 10/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

export class UserConfig implements IComponent {
  elements: ILinkElement[] = [
    {
      name: 'dashboard',
      display: 'USER.DASHBOARD.LABEL',
      link: {path: '/user', param: 'dashboard'}
    },
    {
      name: 'profile',
      display: 'USER.PROFILE.LABEL',
      link: {path: '/user', param: 'profile'}
    },
    {
      name: 'events',
      display: 'USER.EVENTS.LABEL',
      link: {path: '/user', param: 'events'}
    },
    {
      name: 'messages',
      display: 'USER.MESSAGES.LABEL',
      link: {path: '/user', param: 'messages'}
    },
    {
      name: 'uploads',
      display: 'USER.UPLOADS.LABEL',
      link: {path: '/user', param: 'uploads'}
    }
  ];
}
