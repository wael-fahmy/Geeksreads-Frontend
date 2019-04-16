import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/sign-up');
    }

    getEmailTextbox() {
        return element(by.name('email'));
    }

    getPasswordTextbox() {
        return element(by.name('password'));
    }

    getNameTextbox() {
        return element(by.name('name'));
    }

    getForm() {
        return element(by.className('sign-in-form'));
    }

    getSubmitButton() {
        return element(by.id('form-submit-btn'));
    }

}
