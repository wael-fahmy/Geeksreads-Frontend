import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }

    getMoreReviews(){
        return element(by.id('load-more-community-reviews'))
    }
  
   

}
