/**
 * Created by LAE84266 on 14/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { ILinkElement } from 'app/config/interfaces/link-element.interface';

export class ProfileDetailConfig implements IComponent {
  elements: [ILinkElement] = [
    {
      name: 'backLink',
      display: '',
      iconClass: 'fa-angle-left',
      link: {path: '/user/profile'}
    },
  ];
}
