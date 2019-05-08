import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class reviews {
    navigateTo() {
        return browser.get('/reviews');
    }


    getLike(){
        return element(by.cssContainingText('p','Like'))
    }
    getShowLikes(){
        return element(by.id('show-likes'))
    }

   

}
