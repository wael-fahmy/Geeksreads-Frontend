import { browser, by, element, promise, ElementFinder, ElementArrayFinder,protractor } from 'protractor';

export class Author {
    getAuthorName(){
        return element(by.id('Author-name')).getText();
    }
    navigateTo() {
        browser.get('http://localhost:4200/');
        element(by.id('search')).sendKeys('esse').then(()=>{
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            element(by.className('author-book-info-details')).click();
            
        });
    }
}
