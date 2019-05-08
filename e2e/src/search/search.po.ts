import { browser, by, element, promise, ElementFinder, ElementArrayFinder,protractor } from 'protractor';

export class Search {
    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com/');
        browser.get('/homepage');
        element(by.id('search')).sendKeys('esse').then(()=>{
            browser.actions().sendKeys(protractor.Key.ENTER).perform().then(()=>{
                element(by.className('author-book-info-details')).click().then(()=>{
                    element(by.id('show-reviews')).click().then(()=>{
                        element(by.id('comment')).click();
                        browser.waitForAngular();
                    })
                })
            })
        })
    }

}
