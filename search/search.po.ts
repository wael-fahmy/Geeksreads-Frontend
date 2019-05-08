import { browser, by, element, promise, ElementFinder, ElementArrayFinder,protractor } from 'protractor';

export class Search {
    navigateTo() {
       return  browser.get('http://localhost:4200/');
    
    }

}
