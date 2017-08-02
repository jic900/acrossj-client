/**
 * Created by LAE84266 on 29/05/2017.
 */

import { IComponent } from './interfaces/component.interface';
import { IImageElement } from './interfaces/image-element.interface';
import { IElement } from './interfaces/element.interface';
import { IListElement } from './interfaces/list-element.interface';
import { IMenuElement } from './interfaces/menu-element.interface';
import { IOptions } from '../shared/components/daterangepicker/interfaces/options.interface';
import { IDropDownElement } from './interfaces/dropdown-element.interface';
import { IDateRangePickerElement } from './interfaces/daterangepicker-element.interface';

export class NavBarConfig implements IComponent {
  elements: [IImageElement, IElement] = [
    {
      name: 'logo',
      type: 'image',
      path: '/assets/images/home_logo.png'
    },
    {
      name: 'searchButton',
      type: 'button',
      iconClass: 'fa fa-search'
    }
  ]
}

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
          link: {path: '/'}
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
              link: {path: '', param: ''}
            },
            {
              name: 'events',
              display: 'NAVBAR.SIDE.ACCOUNT.MENU.EVENTS',
              link: {path: '', param: ''}
            },
            {
              name: 'messages',
              display: 'NAVBAR.SIDE.ACCOUNT.MENU.MESSAGES',
              link: {path: '', param: ''}
            },
            {
              name: 'uploads',
              display: 'NAVBAR.SIDE.ACCOUNT.MENU.UPLOADS',
              link: {path: '', param: ''}
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
};

export class SearchFieldConfig implements IComponent {
  elements: [IDropDownElement, IDateRangePickerElement, IDropDownElement] = [
    {
      name: 'placeSearcher',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.PLACES.FIELD_INPUT_TXT',
      displayProperty: 'display',
      displayMaxCount: 5,
      sorted: true,
      autoComplete: true
    },
    {
      name: 'dateRangePicker',
      type: 'daterangepicker',
      placeHolder: 'NAVBAR.SEARCH.DRP.INPUT.FIELD_TXT',
      options: DateRangePickerOptions
    },
    {
      name: 'categoryPicker',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.CATEGORY.FIELD_INPUT_TXT',
      displayProperty: 'display'
    }
  ];
}

export class SearchMenuConfig implements IComponent {
  elements: [IElement, IDropDownElement, IDateRangePickerElement, IDropDownElement, IElement] = [
    {
      name: 'title',
      type: 'label',
      display: 'NAVBAR.SEARCH.TITLE'
    },
    {
      name: 'placeSearcher',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.PLACES.MENU_INPUT_TXT',
      displayProperty: 'display',
      displayMaxCount: 5,
      sorted: true,
      autoComplete: true
    },
    {
      name: 'dateRangePicker',
      type: 'daterangepicker',
      placeHolder: 'NAVBAR.SEARCH.DRP.INPUT.MENU_TXT',
      options: DateRangePickerOptions
    },
    {
      name: 'categoryPicker',
      type: 'dropdown',
      placeHolder: 'NAVBAR.SEARCH.CATEGORY.MENU_INPUT_TXT',
      displayProperty: 'display'
    },
    {
      name: 'clearAll',
      type: 'button',
      display: 'NAVBAR.SEARCH.CLEAR_ALL'
    }
  ];
}

const DateRangePickerOptions: IOptions = {
  editableDateRangeField: false,
  openSelectorOnInputClick: true,
  // dateFormat: 'yyyy-mm-dd',
  dateFormat: 'mmm dd',
  dayLabels: {
    su: 'NAVBAR.SEARCH.DRP.WEEKDAY.SUN',
    mo: 'NAVBAR.SEARCH.DRP.WEEKDAY.MON',
    tu: 'NAVBAR.SEARCH.DRP.WEEKDAY.TUE',
    we: 'NAVBAR.SEARCH.DRP.WEEKDAY.WED',
    th: 'NAVBAR.SEARCH.DRP.WEEKDAY.THU',
    fr: 'NAVBAR.SEARCH.DRP.WEEKDAY.FRI',
    sa: 'NAVBAR.SEARCH.DRP.WEEKDAY.SAT'
  },
  monthLabels: {
    1: 'NAVBAR.SEARCH.DRP.MONTH.1',
    2: 'NAVBAR.SEARCH.DRP.MONTH.2',
    3: 'NAVBAR.SEARCH.DRP.MONTH.3',
    4: 'NAVBAR.SEARCH.DRP.MONTH.4',
    5: 'NAVBAR.SEARCH.DRP.MONTH.5',
    6: 'NAVBAR.SEARCH.DRP.MONTH.6',
    7: 'NAVBAR.SEARCH.DRP.MONTH.7',
    8: 'NAVBAR.SEARCH.DRP.MONTH.8',
    9: 'NAVBAR.SEARCH.DRP.MONTH.9',
    10: 'NAVBAR.SEARCH.DRP.MONTH.10',
    11: 'NAVBAR.SEARCH.DRP.MONTH.11',
    12: 'NAVBAR.SEARCH.DRP.MONTH.12'
  },
  selectBeginDateTxt: 'NAVBAR.SEARCH.DRP.BEGIN_DATE',
  selectEndDateTxt: 'NAVBAR.SEARCH.DRP.END_DATE',
}

