import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class user {
    getUserName(){
        return element(by.id('Reviewer-name')).getText();
    }
    navigateTo() {
        var authorName=element(by.id('Reviewer-name'));
        authorName.click();

    }
}
