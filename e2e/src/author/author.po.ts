import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com/');
        return browser.get('/authors');
    }

    getbuttonclick() {
        return element(by.css('button'));
    }

    authorname() {
        return element(by.id('author-name'));
    }

    getSubmitButton() {
        return element(by.className('mat-icon notranslate material-icons mat-icon-no-color'));
    }

}
