import { Books } from './bookStatusInReviews.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Reviews page tests', () => {
    let page: Books;
    let firstOption;
    let secondOption;
    let thirdOption;


    beforeEach(() => {
        page = new Books();
    });

it('should choose the first option in the drop down list',() =>{
    page.navigateTo();
    browser.waitForAngular();
    firstOption=page.getFirstOption();
    secondOption=page.getSecondOption();
    thirdOption=page.getThirdOption();
    firstOption.click().then(function(){
        var firstoptionText=firstOption.getText();
        var secondOptionText=secondOption.getText();
            secondOption.click().then(function(){
                Promise.all([
            expect(firstOption.getText()).toContain(secondOptionText),
            expect(secondOption.getText()).toContain(firstoptionText)])
            });
        }) 
    });
    it('should choose the second option in the drop down list',() =>{
        firstOption=page.getFirstOption();
        secondOption=page.getSecondOption();
        thirdOption=page.getThirdOption();
        firstOption.click().then(function(){
            var firstoptionText=firstOption.getText();
            var thirdOptionText=thirdOption.getText();
                thirdOption.click().then(function(){
                    Promise.all([
                expect(firstOption.getText()).toContain(thirdOptionText),
                expect(thirdOption.getText()).toContain(firstoptionText)])
                });
            }) 
        });
        it('should add it in the user profile',() =>{
        var bookName=element(by.id('title')).getText();
        firstOption=page.getFirstOption().getText().then((text)=>{
            if(text==='Read'){
                element(by.id('user-button')).click().then(()=>{
                    element(by.id('profile-route')).click().then(()=>{
                        element(by.id('read-route')).click().then(()=>{
                            //expect to find the same book title here
                        })
                    })
                })
            }
        })
      
        });
        
   
});
    /******************************************************************************************************* */
