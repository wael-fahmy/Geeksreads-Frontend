import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { SELECT_PANEL_INDENT_PADDING_X } from '@angular/material';

export class author {
    navigateTo() {
         browser.get('/book');
         browser.waitForAngular('30000').then(()=>{  
        var authorName=element(by.id('Author-name'));
        authorName.click();});

    }

    getFollow(){
        return element(by.id('author-follow'))
    }   
    getNumberOfFollowers(){
        return element(by.id('author-followers'))
    }
}
