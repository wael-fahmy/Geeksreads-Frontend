import { Search } from './search.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Reviews page tests', () => {
    let page: Search;
    


    beforeEach(() => {
        page = new Search();
    });

it('should search on esse ',() =>{
    page.navigateTo();
    browser.waitForAngular();
        element(by.id('search')).sendKeys('esse').then(()=>{
            browser.actions().sendKeys(protractor.Key.ENTER).perform().then(()=>{
                expect(element(by.className('author-book-info-details')).getText()).toMatch('esse');
        })
        });
    });
    it('should go to esse page ',() =>{
        element(by.className('author-book-info-details')).click().then(()=>{
            expect(element(by.id('title')).getText()).toMatch('esse')
        })
        });

});
