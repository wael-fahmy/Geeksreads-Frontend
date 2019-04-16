import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        return browser.get('/sign-in');
    }

    getEmailTextbox() {
        return element(by.name('email'));
    }

    getPasswordTextbox() {
        return element(by.name('password'));
        // by.css('[type="text"]') // visible in screenshots?
    }

    getForm() {
        return element(by.className('sign-in-form'));
    }

    getSubmitButton() {
        return element(by.id('form-submit-btn'));
    }

}
