import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }


    getLike(){
        return element(by.id('liked0'))
    }
    getShowLikes(){
        return element(by.id('show-likes0'))
    }

   

}
