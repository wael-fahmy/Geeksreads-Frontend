import { Books } from './aboutAuthor.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Book tests', () => {
    let page: Books;
    let authorDetails;
    let ReadMore;
    let dots;
    let moreAuthorDisc;


    beforeEach(() => {
        page = new Books();
    });

it('should show details about author',() =>{
    page.navigateTo();

    authorDetails=page.getAuthorDetails();
    authorDetails.click().then(function(){
            expect(element(by.id('mat-expansion-panel-header-2')).isDisplayed()).toBeTruthy; 
        }) 
    });
    it('should hide author details',() =>{
        authorDetails=page.getAuthorDetails();
            authorDetails.click().then(function(){
                expect(element(by.id('mat-expansion-panel-header-2')).isDisplayed()).toBeFalsy; 
            })
        });

    it('info about author should be short', () => {
        moreAuthorDisc=page.getmoreAuthorDisc();
        dots=page.getDotsAuthorDisc();
        ReadMore=page.getReadMoreAboutAuthor();
        authorDetails=page.getAuthorDetails();
        authorDetails.click();
      //  element(by.id('about-this-author')).click();
      ReadMore.getText().then(function(text){
            if(text=="Read more"){
                Promise.all([
                expect(moreAuthorDisc.isDisplayed()).toBeFalsy,
                expect(dots.isDisplayed()).toBeTruthy])
            }

        })
    });
    it('should display author info (press read more)', () => {
        moreAuthorDisc=page.getmoreAuthorDisc();
        dots=page.getDotsAuthorDisc();
        ReadMore=page.getReadMoreAboutAuthor();
        ReadMore.click().then(function(done){
            Promise.all([
                expect(ReadMore.getText()).toContain("Read less"),
                expect(moreAuthorDisc.isDisplayed()).toBeTruthy,
                expect(dots.isDisplayed()).toBeFalsy]).then(function() {
                done();
            }).catch(function() {
                done.fail('failed');
            })
    
    });
});
    it('should show less author info (press read less)', () => {
        moreAuthorDisc=page.getmoreAuthorDisc();
        dots=page.getDotsAuthorDisc();
        ReadMore=page.getReadMoreAboutAuthor();
        ReadMore.click().then(function(done){
            Promise.all([
                expect(ReadMore.getText()).toContain("Read more"),
                expect(moreAuthorDisc.isDisplayed()).toBeFalsy,
                expect(dots.isDisplayed()).toBeTruthy]).then(function() {
                    done();
                }).catch(function() {
                    done.fail('failed'); 
    });
});
});
});
    /******************************************************************************************************* */
