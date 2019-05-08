import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
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
