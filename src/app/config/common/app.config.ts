/**
 * Created by LAE84266 on 20/03/2017.
 */

export const AppConfig = {
  HOME_LOGO: '/assets/images/home_logo.png',
  HOME_BACKGROUND: '/assets/images/home_bg.png',
  USER_BACKGROUND: '/assets/images/user_bg.png',
  // MENU_HOVER_MODE: true,
  PLACE_SEARCH_RESULT_LIMIT: 5,
  HTTP_TIMEOUT: 10000,           // in millisecond
  HTTP_RETRY_DELAY: 1000,        // in millisecond
  HTTP_RETRY_MAX: 3,
  ERROR: {
    SYSTEM_UNAVAILABLE: 'MESSAGES.GENERIC.SYSTEM_UNAVAILABLE',
    GATEWAY_TIMEOUT: 'MESSAGES.GENERIC.GATEWAY_TIMEOUT',
    GENERIC: 'MESSAGES.GENERIC.OTHERS'
  }
}

// export class AppConfig {
//   public static HOME_LOGO: string = '/assets/images/home_logo.png';
//   public static HOME_BACKGROUND: string = '/assets/images/home_bg.png';
//   // public static MENU_HOVER_MODE: boolean = true;
//   public static PLACE_SEARCH_RESULT_LIMIT = 5;
// }





