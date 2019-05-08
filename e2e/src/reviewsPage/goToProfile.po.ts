import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class user {
    getUserName(){
        return element(by.id('user-name')).getText();
    }
    navigateTo() {
        browser.get('/reviews');
        browser.waitForAngular('30000').then(()=>{ 
        var userName=element(by.id('user-name'));
        userName.click();});

    }
    
    navigatebyImg() {
        browser.get('/reviews');
        browser.waitForAngular('30000').then(()=>{ 
        var userName=element(by.id('user-image'));
        userName.click();});

    }
}
