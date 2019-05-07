import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Books {

    navigateTo() {
        browser.get('http://geeksreads.herokuapp.com');
        return browser.get('/book');
    }


    getLike() {
        return element(by.id('liked0'));
    }

    getComment() {
        return element(by.cssContainingText('p', 'Comment'));
        /*var names = element.all(by.className('blue-text'));
          names.each(function(elem) {
            elem.getText().then(function (name) {
            if ('Comment' === name) {
                return elem
            }
            })

          });*/

    }
    getFollow() {
        return element(by.className('author-following-button ng-star-inserted'));
    }

    getForm() {
        return element(by.className('ng-star-inserted'));
    }
    getBookDetails() {
        return element(by.id('about-this-author'));
    }


}
