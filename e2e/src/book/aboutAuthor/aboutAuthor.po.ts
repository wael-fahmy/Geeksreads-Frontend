import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {
    navigateTo() {
        return browser.get('/book');
    }

    getAuthorDetails(){
        return element(by.id('about-this-author'))
    }
    getmoreAuthorDisc(){
        return element(by.id('more-author-discription'))
    }
   getReadMoreAboutAuthor(){
       return element(by.id('myBtn-author-discription'))
       
   }
   getDotsAuthorDisc(){
       return element(by.id('dots-author-discription'))
   }

}
