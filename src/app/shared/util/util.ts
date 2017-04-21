/**
 * Created by qiz264 on 2017-04-20.
 */

export class Util {

  private static PLATFORM_IOS_PATTERN = /(iPhone|iPad)/i;
  private static APPVERSION_IOS_PATTERN = /(iPhone|iPad)/i;
  private static PLATFORM_ANDROID_PATTERN = /(Linux armv)/i;
  private static APPVERSION_ANDROID_PATTERN = /(Android)/i;
  private static USERAGENT_ANDROID_PATTERN = /(Android)/i;

  public static deviceType() {
    if (window.navigator.platform.match(this.PLATFORM_IOS_PATTERN)) {
      return 'ios';
    } else if (window.navigator.platform.match(this.PLATFORM_ANDROID_PATTERN) ||
      window.navigator.userAgent.match(this.USERAGENT_ANDROID_PATTERN)) {
      return 'android';
    } else {
      return 'desktop';
    }
  }
  public static isPhoneOrTablet(): boolean {
    if (window.navigator.platform.match(this.PLATFORM_IOS_PATTERN) ||
        window.navigator.platform.match(this.PLATFORM_ANDROID_PATTERN) ||
        window.navigator.userAgent.match(this.USERAGENT_ANDROID_PATTERN) ||
        window.navigator.appVersion.match(this.APPVERSION_IOS_PATTERN) ||
        window.navigator.appVersion.match(this.APPVERSION_ANDROID_PATTERN)) {
      return true;
    }
  }
}
