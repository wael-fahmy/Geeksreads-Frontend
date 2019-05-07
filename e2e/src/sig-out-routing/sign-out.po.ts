import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com');
        return browser.get('/sign-out');
    }
    getusermenu() {
        return element(by.className('user-menu'));
    }
    getForm() {
        return element(by.className('ng-star-inserted'));
    }

    geticon() {
        return element(by.className('mat-icon notranslate material-icons mat-icon-no-color'));
    }

}
