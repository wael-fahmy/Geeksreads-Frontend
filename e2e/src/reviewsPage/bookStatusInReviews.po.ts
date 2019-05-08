import { browser, by, element, promise, ElementFinder, ElementArrayFinder,protractor } from 'protractor';

export class Books {
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

    getFirstOption(){
        return element(by.id('first-option'))
    }
  getSecondOption(){
      return element(by.id('second-option'))
  }
  getThirdOption(){
      return element(by.id('third-option'))
  }
}
