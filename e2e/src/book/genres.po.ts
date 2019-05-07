import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }
    getGenres(){
        return element(by.id('genres'))
    }
    getmoreaboutGenres(){
        return element(by.id('cdk-accordion-child-0'))
    }


}
