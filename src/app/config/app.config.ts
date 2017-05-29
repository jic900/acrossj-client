/**
 * Created by LAE84266 on 20/03/2017.
 */

export class AppConfig {
  public static API_ENDPOINT: string = 'http://127.0.0.1:10007/api/';
  public static HOME_LOGO: string = '/assets/images/home_logo.png';
  public static HOME_BACKGROUND: string = '/assets/images/home_bg.png';
  // public static MENU_HOVER_MODE: boolean = true;
  public static PLACE_SEARCH_RESULT_LIMIT = 5;
}

export class AppConstant {
  public static BOOTSTRAP_TOGGLE_BREAKPOINT: number = 1025;
  public static IPHONE6_WIDTH: number = 375;
  // public static IPAD_WIDTH: number = 768;
  // public static IPAD_PRO_WIDTH: number = 1024;
}

export const MenuState = {
  pre_collapsed: 0,
  collapsed: 1,
  pre_expanded: 2,
  expanded: 3,
}

