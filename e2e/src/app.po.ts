import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    browser.get('http://geeksreads.herokuapp.com/');
    return browser.get(browser.baseUrl) as Promise<any>;
  }


}
