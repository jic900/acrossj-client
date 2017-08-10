/**
 * Created by LAE84266 on 10/08/2017.
 */

import { IComponent } from './interfaces/component.interface';
import { IForm } from './interfaces/form.interface';
import { IElement } from './interfaces/element.interface';
import { ILinkElement } from './interfaces/link-element.interface';
import { IInputElement } from './interfaces/input-element.interface';
import { IValidator } from './interfaces/validator.interface';
import { IMessageElement } from './interfaces/message-element';

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
