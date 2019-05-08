import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }

    getAmazon(){
        return element(by.id('amazon-store'))
    }
    getLibraries(){
        return element(by.id('libraries-store'))
    }
    getOnlineStores(){
        return element(by.id('online-store'))
    }
 
   

}
