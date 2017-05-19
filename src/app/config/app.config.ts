/**
 * Created by LAE84266 on 20/03/2017.
 */

export class AppConfig {
  public static API_ENDPOINT: string = 'http://127.0.0.1:10007/api/';
  public static HOME_LOGO: string = '/assets/images/home_logo.png';
  public static HOME_BACKGROUND: string = '/assets/images/home_bg.png';
  public static MENU_HOVER_MODE: boolean = true;
  public static PLACE_SEARCH_RESULT_LIMIT = 5;
}

export class AppConstant {
  public static BOOTSTRAP_TOGGLE_BREAKPOINT: number = 1025;
  public static IPHONE6_WIDTH: number = 375;
  public static IPAD_WIDTH: number = 768;
  public static IPAD_PRO_WIDTH: number = 1024;
}

export const SideMenuDef = {
  topList: {
    display: '',
    value: [
      {display: 'NAVBAR.SIDE.ABOUT_US', iconClass: 'fa-info-circle'},
      {display: 'NAVBAR.SIDE.CREATE_TRIP', iconClass: 'fa-calendar-plus-o'},
      {display: 'NAVBAR.SIDE.HELP', iconClass: 'fa-question-circle-o'}
    ]
  }
};

export const SubMenuDef = {
  user: {
    display: 'NAVBAR.SIDE.USER.LABEL',
    type: 'user',
    value: [
      {display: 'Profile'},
      {display: 'Your Trips'},
      {display: 'Messages'},
      {display: 'Uploads'}
    ],
    iconClass: 'fa-user'
  },
  language: {
    display: 'NAVBAR.SIDE.LANGUAGE.LABEL',
    type: 'language',
    value: [
      {display: 'NAVBAR.SIDE.LANGUAGE.MENU.ENGLISH', type: 'en'},
      {display: 'NAVBAR.SIDE.LANGUAGE.MENU.JAPANESE', type: 'ja'},
      {display: 'NAVBAR.SIDE.LANGUAGE.MENU.CHINESE', type: 'zh'}
    ],
    iconClass: 'fontello-globe'
  }
};

export const MenuState = {
  default: 0,
  collapsed: 1,
  expanded: 2
}

export const DateRangePickerOptions = {
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
};

export const CategoryOptions = [
  {display: 'Skii'},
  {display: 'Bicycling', iconClass: 'fa fa-bicycle'},
  {display: 'Hiking'},
  {display: 'Other'}
];
