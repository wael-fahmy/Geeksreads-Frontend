import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://localhost:4200');
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

    getnavsignin() {
        return element(by.id('sign-in-link'));
    }
    getnav() {
        return element(by.className('nav-margin'));
    }
    getjoin() {
        return element(by.id('sign-up-link'));
    }
    navigateTosignin() {
        browser.get('http://localhost:4200');
        return browser.get('/sign-in');
    }

    getEmailaignin() {
        return element(by.name('email'));
    }

    getPasswordsignin() {
        return element(by.name('password'));
        // by.css('[type="text"]') // visible in screenshots?
    }

    getFormsignin() {
        return element(by.className('sign-in-form'));
    }

    getSubmitButtonsignin() {
        return element(by.id('form-submit-btn'));
    }
}
