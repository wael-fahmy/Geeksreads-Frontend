import { browser, by, element, promise, ElementFinder, ElementArrayFinder,protractor } from 'protractor';

export class Books {
    navigateTo() {
        browser.get('http://localhost:4200/');
        element(by.id('search')).sendKeys('sit').then(()=>{
            browser.actions().sendKeys(protractor.Key.ENTER).perform().then(()=>{
                element(by.className('author-book-info-details')).click().then(()=>{
    
                    
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
  getFourthOption(){
      return element(by.id('fourth-option'))
  }
}
