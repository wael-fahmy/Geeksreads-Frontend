import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }

    getFollow(){
        return element(by.className('author-following-button ng-star-inserted'))
    }   
    getNumberOfFollowers(){
        return element(by.id('number-followers'))
    }

}
