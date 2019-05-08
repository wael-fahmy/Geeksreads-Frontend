import { Books } from './bookStatusInReviews.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';
import { ExpressionStatement } from '@angular/compiler';



describe('Reviews page tests', () => {
    let page: Books;
    let firstOption;
    let secondOption;
    let thirdOption;
    let title;


    beforeEach(() => {
        page = new Books();
        browser.ignoreSynchronization = false;
    });

it('if the book is not in the shelf we have 3 options want to read currently reading and read',() =>{
    page.navigateTo();
    browser.waitForAngular();
    firstOption=page.getFirstOption();
    firstOption.click().then(function(){
            browser.waitForAngular('30000');
            promise.all([
                expect(page.getSecondOption().getText()).toContain('Want To Read'),
                expect(page.getThirdOption().getText()).toContain('Currently Reading'),
                expect(page.getFourthOption().getText()).toContain('Read')

            ])
        
    });
  
});
it('if the book is in want to read status we should have 2 options, currently reading and',() =>{
    firstOption=page.getFirstOption();
    firstOption.click().then(function(){
        secondOption.click().then(function(){
            promise.all([
                expect(page.getSecondOption().getText()).toContain('Currently Reading'),
                expect(page.getThirdOption().getText()).toContain('Remove From Shelve'),
                expect(page.getFourthOption().getText()).toContain('')

            ])
      
        })
          
    });
  
});
it('book should be in the want to read of the user',() =>{
    title=element(by.id('title')).getText();
    element(by.id('user-button')).click();
    browser.waitForAngular();
    element(by.id('profile-route')).click().then(function(){
        element(by.id('want-to-read-route')).click().then(function(){
                expect(element(by.id('book-route'))).toContain('title');
      
        })
          
    });
  
});
});
    /******************************************************************************************************* */
