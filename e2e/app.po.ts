import { browser, element, by } from 'protractor';

export class AcrossjClientPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('aj-root h1')).getText();
  }
}
