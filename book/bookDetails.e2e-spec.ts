import { Books } from './bookDetails.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Book tests', () => {
    let page: Books;
    let bookDetails;
    


    beforeEach(() => {
        page = new Books();
    });

it('should show details of the book and then hide it',() =>{
    page.navigateTo();
    bookDetails=page.getBookDetails();
    bookDetails.click().then(function(){
            expect(element(by.id('cdk-accordion-child-1')).isDisplayed()).toBeTruthy; 
        })

});
it('should hide details of the book ',() =>{
    bookDetails=page.getBookDetails();
    bookDetails.click().then(function(){
            expect(element(by.id('cdk-accordion-child-1')).isDisplayed()).toBeFalsy; 
        })

});


    
});
    /******************************************************************************************************* */
