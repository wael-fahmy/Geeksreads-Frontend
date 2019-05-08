import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }



    getComment(){
        return element(by.cssContainingText('p', 'Comment'))
    
    }
 
   

}
