/**
 * Created by LAE84266 on 12/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { IListElement } from 'app/config/interfaces/list-element.interface';
import { IElement } from 'app/config/interfaces/element.interface';

export class ProfileMenuConfig implements IComponent {
  elements: [IElement, IListElement] = [
    {
      name: 'menuTitle',
      type: 'label',
      display: 'USER.PROFILE.LABEL'
    },
    {
      name: 'menuList',
      type: 'list',
      list: [
        {
          item: {
            name: 'personalInfo',
            display: 'USER.PROFILE.PERSONAL_INFO.LABEL',
            iconClass: 'fa-user',
            link: {path: '/user/profile/personalinfo'},
            navIconClass: 'fa-angle-right'
          }
        },
        {
          item: {
            name: 'changePassword',
            display: 'USER.PROFILE.CHANGE_PASSWORD.LABEL',
            iconClass: 'fa-info-circle',
            link: {path: '/user/profile/changepassword'},
            navIconClass: 'fa-angle-right'
          }
        }
      ]
    }
  ];
}
