import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class BookShelves {
    navigateTo() {
        return browser.get('/genres');
    }

    getBook() {
        return element(by.class('book-entity'));
    }
    getWantToRead() {
        return element(by.class('book-button'));
    }
   getImage(){
       return element(by.class('book-image mat-card-image'))
   }

}
