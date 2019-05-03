import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://localhost:4200');
        return browser.get('/sign-in');
    }

    getbuttonclick() {
        return element(by.id('sign-in-link'));
    }

    getForm() {
        return element(by.className('mat-toolbar-row'));
    }



}
