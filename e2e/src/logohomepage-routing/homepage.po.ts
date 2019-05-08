import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://localhost:4200');
        return browser.get('/homepage');
    }

    getbuttonclick() {
        return element(by.id('nav-logo'));
    }

}
