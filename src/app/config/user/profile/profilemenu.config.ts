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
          name: 'personalInfo',
          type: 'link',
          display: 'USER.PROFILE.PERSONAL_INFO.LABEL',
          iconClass: 'fa-user',
          link: {path: '/user/profile/personalinfo'},
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'changePassword',
          type: 'link',
          display: 'USER.PROFILE.CHANGE_PASSWORD.LABEL',
          iconClass: 'fa-info-circle',
          link: {path: '/user/profile/changepassword'},
          navIconClass: 'fa-angle-right'
        },
        {
          name: 'eventRelated',
          type: 'list',
          display: 'USER.PROFILE.EVENT_RELATED.LABEL',
          iconClass: 'fa-info-circle',
          list: [
            {
              name: 'running',
              type: 'sublink',
              display: 'USER.PROFILE.EVENT_RELATED.RUNNING.LABEL',
              iconClass: 'fa-info-circle',
              link: {path: '/user/profile/eventinfo/running'},
              navIconClass: 'fa-angle-right'
            },
            {
              name: 'skii',
              type: 'sublink',
              display: 'USER.PROFILE.EVENT_RELATED.SKII.LABEL',
              iconClass: 'fa-info-circle',
              link: {path: '/user/profile/eventinfo/skii'},
              navIconClass: 'fa-angle-right'
            },
            {
              name: 'hiking',
              type: 'sublink',
              display: 'USER.PROFILE.EVENT_RELATED.HIKING.LABEL',
              iconClass: 'fa-info-circle',
              link: {path: '/user/profile/eventinfo/hiking'},
              navIconClass: 'fa-angle-right'
            },
            {
              name: 'camping',
              type: 'sublink',
              display: 'USER.PROFILE.EVENT_RELATED.CAMPING.LABEL',
              iconClass: 'fa-info-circle',
              link: {path: '/user/profile/eventinfo/camping'},
              navIconClass: 'fa-angle-right'
            },
            {
              name: 'bicycling',
              type: 'sublink',
              display: 'USER.PROFILE.EVENT_RELATED.BICYCLING.LABEL',
              iconClass: 'fa-info-circle',
              link: {path: '/user/profile/eventinfo/bicycling'},
              navIconClass: 'fa-angle-right'
            },
            {
              name: 'others',
              type: 'sublink',
              display: 'USER.PROFILE.EVENT_RELATED.OTHERS.LABEL',
              iconClass: 'fa-info-circle',
              link: {path: '/user/profile/eventinfo/others'},
              navIconClass: 'fa-angle-right'
            }
          ],
          navIconClass: 'fa-angle-down'
        },
        {
          name: 'groupInfo',
          type: 'link',
          display: 'USER.PROFILE.GROUP_INFO.LABEL',
          iconClass: 'fa-info-circle',
          link: {path: '/user/profile/groupinfo'},
          navIconClass: 'fa-angle-right'
        }
      ]
    }
  ];
}
