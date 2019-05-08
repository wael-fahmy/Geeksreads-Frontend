import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Author {
    getAuthorName(){
        browser.get('/book');
        return element(by.id('Author-name')).getText();
    }
    navigateTo() {
        var authorName=element(by.id('Author-name'));
        authorName.click();

    }
}
