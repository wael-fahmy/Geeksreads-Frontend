import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com/');
        return browser.get('/book');
    }

    getAmazon() {
        return element(by.id('amazon-store'));
    }
    getLibraries() {
        return element(by.id('libraries-store'));
    }
    getOnlineStores() {
        return element(by.id('online-store'));
    }

}
