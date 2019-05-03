import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com');
        return browser.get('/profile-edit');
    }

    getusernameTextbox() {
        return element(by.name('userName'));
    }

    getemailTextbox() {
        return element(by.name('email'));
    }

    getPasswordTextbox() {
        return element(by.name('password'));
    }

    getForm() {
        return element(by.className('profile-edit'));
    }

    getSubmitButton() {
        // e7tmal yghyaro el class name da w y7oto id, msh 3rfa
        return element(by.className('btn mat-raised-button'));
    }

}
