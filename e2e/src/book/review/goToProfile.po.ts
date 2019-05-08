import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class user {
    getUserName(){
        return element(by.id('Reviewer-name')).getText();
    }
    navigateTo() {
        browser.get('/book');
        var userName=element(by.id('Reviewer-name'));
        userName.click();

    }
    
    navigatebyImg() {
        browser.get('/book');
        var userName=element(by.className('reviewer-image'));
        userName.click();

    }
}
