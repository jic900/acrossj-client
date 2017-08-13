/**
 * Created by LAE84266 on 11/08/2017.
 */

import { IComponent } from 'app/config/interfaces/component.interface';
import { IListElement } from 'app/config/interfaces/list-element.interface';
import { IMenuElement } from 'app/config/interfaces/menu-element.interface';

export class SideMenuConfig implements IComponent {
  elements: [IListElement, IMenuElement] = [
    {
      name: 'topList',
      type: 'list',
      list: [
        {
          name: 'aboutUs',
          display: 'NAVBAR.SIDE.ABOUT_US',
          iconClass: 'fa-info-circle',
          link: {path: ''}
        },
        {
          name: 'createEvent',
          display: 'NAVBAR.SIDE.CREATE_EVENT',
          iconClass: 'fa-calendar-plus-o',
          link: {path: ''}
        },
        {
          name: 'help',
          display: 'NAVBAR.SIDE.HELP',
          iconClass: 'fa-question-circle-o',
          link: {path: ''}
        },
      ]
    },
    {
      name: 'bottomMenu',
      type: 'menu',
      links: [
        {
          name: 'search',
          iconClass: 'fa fa-fw fa-search',
          link: null
        },
        {
          name: 'signinSignup',
          display: 'NAVBAR.SIDE.SIGNIN_SIGNUP',
          link: {path: '/auth', param: 'signin'}
        },
        {
          name: 'signout',
          display: 'NAVBAR.SIDE.SIGNOUT',
          link: {path: '/auth', param: 'signout'}
        }
      ],
      submenus: [
        {
          name: 'auth',
          type: 'list',
          iconClass: 'fa-user',
          list: [
            {
              name: 'signin',
              display: 'NAVBAR.SIDE.AUTH.MENU.SIGNIN',
              link: {path: '/auth', param: 'signin'}
            },
            {
              name: 'signup',
              display: 'NAVBAR.SIDE.AUTH.MENU.SIGNUP',
              link: {path: '/auth', param: 'signup'}
            }
          ]
        },
        {
          name: 'account',
          type: 'list',
          display: 'NAVBAR.SIDE.ACCOUNT.LABEL',
          iconClass: 'fa-user',
          list: [
            {
              name: 'profile',
              display: 'NAVBAR.SIDE.ACCOUNT.MENU.PROFILE',
              link: {path: '/user/profile'}
            },
            {
              name: 'events',
              display: 'NAVBAR.SIDE.ACCOUNT.MENU.EVENTS',
              link: {path: '/user/events'}
            },
            {
              name: 'messages',
              display: 'NAVBAR.SIDE.ACCOUNT.MENU.MESSAGES',
              link: {path: '/user/messages'}
            },
            {
              name: 'uploads',
              display: 'NAVBAR.SIDE.ACCOUNT.MENU.UPLOADS',
              link: {path: '/user/uploads'}
            }
          ]
        },
        {
          name: 'language',
          type: 'list',
          display: 'NAVBAR.SIDE.LANGUAGE.LABEL',
          iconClass: 'fontello-globe',
          list: [
            {
              name: 'en',
              iconClass: 'flag-icon flag-icon-us',
              display: 'NAVBAR.SIDE.LANGUAGE.MENU.ENGLISH',
              link: null
            },
            {
              name: 'ja',
              iconClass: 'flag-icon flag-icon-jp',
              display: 'NAVBAR.SIDE.LANGUAGE.MENU.JAPANESE',
              link: null
            },
            {
              name: 'zh',
              iconClass: 'flag-icon flag-icon-cn',
              display: 'NAVBAR.SIDE.LANGUAGE.MENU.CHINESE',
              link: null
            }
          ]
        }
      ]
    }
  ];
}
