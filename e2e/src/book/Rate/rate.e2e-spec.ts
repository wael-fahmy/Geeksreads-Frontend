import { Rate } from './rate.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Reviews page tests', () => {
    let page: Rate;
    let RateBtn;


    beforeEach(() => {
        page = new Rate();
    });

it('should Rate with one star',() =>{
    page.navigateTo();
    browser.waitForAngular();
    RateBtn=page.getRateBtn();
    RateBtn.click().then(()=>{
            expect( element(by.id('rate-first')).click()).toBeTruthy;
    })
        });
        it('should Rate with four star',() =>{
            page.navigateTo();
            browser.waitForAngular();
            RateBtn=page.getRateBtn();
            RateBtn.click().then(()=>{
                    expect( element(by.id('rate-second')).click()).toBeTruthy;
            })
                });
        
   
});
 