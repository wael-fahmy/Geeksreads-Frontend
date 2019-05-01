import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com/');
        return browser.get('/profile');
    }

    getbuttonclick() {
        return element(by.css('button'));
    }

    getForm() {
        return element(by.className('ng-star-inserted'));
    }

    getSubmitButton() {
        return element(by.className('mat-icon notranslate material-icons mat-icon-no-color'));
    }

}
