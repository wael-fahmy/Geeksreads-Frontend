import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book')

    }

    getFollow(){
        return element(by.className('author-following-button ng-star-inserted'))
    }   
    getNumberOfFollowers(){
        return element(by.id('number-followers'))
    }
    signIn(){
        browser.get('/sign-in');
        var email=element(by.name('email'));
        var submit =element(by.id('form-submit-btn'));
        var pass=element(by.name('password'));
        email.sendKeys("samersosta@gmail.com");
        pass.sendKeys("e10adc3949ba59abbe56e057f20f883e");
        submit.click();
    }
}
