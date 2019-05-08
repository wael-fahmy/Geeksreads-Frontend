import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }


    getBookDetails(){
        return element(by.id('book-details-more'))
    }
   

}
