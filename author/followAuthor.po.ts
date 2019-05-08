import { browser, by, element, promise, ElementFinder, ElementArrayFinder,protractor } from 'protractor';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';

export class author {
    signIn(){
        browser.get('/sign-in');
        var email=element(by.name('email'));
        var submit =element(by.id('form-submit-btn'));
        var pass=element(by.name('password'));
        email.sendKeys("samersosta@gmail.com");
        pass.sendKeys("234567");
        return submit.click();
    }
    navigateTo() {
        browser.get('http://localhost:4200/');
        element(by.id('search')).sendKeys('esse').then(()=>{
            browser.actions().sendKeys(protractor.Key.ENTER).perform();
            element(by.className('author-book-info-details')).click();
            element(by.id('Author-name')).click();
            
        });
    }

    getFollow(){
        return element(by.id('author-follow'))
    }   
    getUnfollow(){
        return element(by.id('author-unfollow'))
    }
    getNumberOfFollowers(){
        return element(by.id('author-followers'))
    }
}
