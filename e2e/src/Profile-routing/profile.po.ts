import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com');
        return browser.get('/profile');
    }

    getbuttonclick() {
        return element(by.id('cdk-overlay-0'));
    }

    getForm() {
        return element(by.className('ng-star-inserted'));
    }



}
