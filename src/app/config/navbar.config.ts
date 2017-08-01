/**
 * Created by LAE84266 on 29/05/2017.
 */

export const CategoryOptions = [
  {display: 'Skii'},
  {display: 'Bicycling', iconClass: 'fa fa-bicycle', link: '/'},
  {display: 'Hiking'},
  {display: 'Other'}
];

const PlaceSearcher = {
  fieldPlaceHolder: 'NAVBAR.SEARCH.PLACES.FIELD_INPUT_TXT',
  menuPlaceHolder: 'NAVBAR.SEARCH.PLACES.MENU_INPUT_TXT',
  displayProperty: 'display',
  displayMaxCount: 5,
  sorted: true,
  autoComplete: true
};

const DateRangePicker = {
  fieldPlaceHolder: 'NAVBAR.SEARCH.DRP.INPUT.FIELD_TXT',
  menuPlaceHolder: 'NAVBAR.SEARCH.DRP.INPUT.MENU_TXT',
  options: {
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
};

const CategoryPicker = {
  fieldPlaceHolder: 'NAVBAR.SEARCH.CATEGORY.FIELD_INPUT_TXT',
  menuPlaceHolder: 'NAVBAR.SEARCH.CATEGORY.MENU_INPUT_TXT',
  displayProperty: 'display'
};

const SideMenuConfig111 = {
  elements: [
    {
      name: 'sidemenu',
      type: 'menu',
      links: [],
      submenus: []
    },
    {
      name: 'searchButton',
      type: 'button',
      display: ''
    }
  ]
}
const SideMenuConfig = {
  topList: {
    display: '',
    value: [
      {display: 'NAVBAR.SIDE.ABOUT_US', iconClass: 'fa-info-circle'},
      {display: 'NAVBAR.SIDE.CREATE_EVENT', iconClass: 'fa-calendar-plus-o'},
      {display: 'NAVBAR.SIDE.HELP', iconClass: 'fa-question-circle-o'}
    ]
  },
  searchField: {
    placeSearcher: PlaceSearcher,
    dateRangePicker: DateRangePicker,
    categoryPicker: CategoryPicker
  },
  searchButton: {
    display: '',
    iconClass: 'fa fa-fw fa-search'
  },
  auth: {
    display: 'NAVBAR.SIDE.AUTH.LABEL',
    type: 'auth',
    value: [
      {display: 'NAVBAR.SIDE.AUTH.MENU.SIGNIN', link: '/auth', linkParam: 'signin'},
      {display: 'NAVBAR.SIDE.AUTH.MENU.SIGNUP', link: '/auth', linkParam: 'signup'}
    ],
    iconClass: 'fa-user'
  },
  user: {
    display: 'NAVBAR.SIDE.USER.LABEL',
    type: 'user',
    value: [
      {display: 'NAVBAR.SIDE.USER.MENU.PROFILE'},
      {display: 'NAVBAR.SIDE.USER.MENU.EVENTS'},
      {display: 'NAVBAR.SIDE.USER.MENU.MESSAGES'},
      {display: 'NAVBAR.SIDE.USER.MENU.UPLOADS'}
    ],
    iconClass: 'fa-user'
  },
  language: {
    display: 'NAVBAR.SIDE.LANGUAGE.LABEL',
    type: 'language',
    value: [
      {display: 'NAVBAR.SIDE.LANGUAGE.MENU.ENGLISH', type: 'en', iconClass: 'flag-icon flag-icon-us'},
      {display: 'NAVBAR.SIDE.LANGUAGE.MENU.JAPANESE', type: 'ja', iconClass: 'flag-icon flag-icon-jp'},
      {display: 'NAVBAR.SIDE.LANGUAGE.MENU.CHINESE', type: 'zh', iconClass: 'flag-icon flag-icon-cn'}
    ],
    iconClass: 'fontello-globe'
  },
  signinSignup: {
    display: 'NAVBAR.SIDE.SIGNIN_SIGNUP',
    link: '/auth',
    linkParam: 'signin'
  },
  signout: {
    display: 'NAVBAR.SIDE.SIGNOUT',
    link: '/'
  }
};

export const NavbarConfig = {
  homeLogo: '/assets/images/home_logo.png',
  searchButton: {
    display: '',
    iconClass: 'fa fa-search'
  },
  sideMenu: SideMenuConfig,
  searchMenu: {
    title: 'NAVBAR.SEARCH.TITLE',
    placeSearcher: PlaceSearcher,
    dateRangePicker: DateRangePicker,
    categoryPicker: CategoryPicker,
    clearAll: 'NAVBAR.SEARCH.CLEAR_ALL'
  }
};

