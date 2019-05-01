
import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com/');
        return browser.get('/newsfeed');
    }


    getForm() {
        return element(by.className('nav-margin'));
    }
    getclicking() {
        return element(by.xpath('nav-margin'));
    }


}
