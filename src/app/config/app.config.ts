/**
 * Created by LAE84266 on 20/03/2017.
 */

export const AppConfig = {
  HOME_LOGO: '/assets/images/home_logo.png',
  HOME_BACKGROUND: '/assets/images/home_bg.png',
  // MENU_HOVER_MODE: true,
  PLACE_SEARCH_RESULT_LIMIT: 5,
  HTTP_TIMEOUT: 10000,           // in millisecond
  HTTP_RETRY_DELAY: 1000,        // in millisecond
  HTTP_RETRY_MAX: 3,
  ERROR: {
    SYSTEM_UNAVAILABLE: 'ERRORS.GENERIC.SYSTEM_UNAVAILABLE',
    GATEWAY_TIMEOUT: 'ERRORS.GENERIC.GATEWAY_TIMEOUT',
    GENERIC: 'ERRORS.GENERIC.OTHERS'
  }
}

// export class AppConfig {
//   public static HOME_LOGO: string = '/assets/images/home_logo.png';
//   public static HOME_BACKGROUND: string = '/assets/images/home_bg.png';
//   // public static MENU_HOVER_MODE: boolean = true;
//   public static PLACE_SEARCH_RESULT_LIMIT = 5;
// }

export const AppConstant = {
  BOOTSTRAP_TOGGLE_BREAKPOINT: 1025,
  IPHONE6_WIDTH: 375
}
// export class AppConstant {
//   public static BOOTSTRAP_TOGGLE_BREAKPOINT: number = 1025;
//   public static IPHONE6_WIDTH: number = 375;
//   // public static IPAD_WIDTH: number = 768;
//   // public static IPAD_PRO_WIDTH: number = 1024;
// }

export const MenuState = {
  pre_collapsed: 0,
  collapsed: 1,
  pre_expanded: 2,
  expanded: 3,
}

