
import { Connect } from './connect.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Lower bar test to social media', () => {
let connect:Connect;
let facebook;
let twitter;
let instagram;
let linkedin;
beforeEach(() => {
    connect = new Connect();
});


    it('should connect to facebook', () => {
    connect.navigateTo();
       facebook=connect.getFacebook();
       facebook.click().then(function(){
        expect(browser.driver.getCurrentUrl()).toMatch('https://www.facebook.com/Goodreads/');})
      });

      it('should connect to twitter', () => {
          connect.navigateTo();
        twitter=connect.getTwitter();
        twitter.click().then(function(){
            expect(browser.driver.getCurrentUrl()).toMatch('https://twitter.com/goodreads');})
       });
       it('should connect to instagram ', () => {
           connect.navigateTo();
        instagram=connect.getInstagram();
        instagram.click().then(function(){
            expect(browser.driver.getCurrentUrl()).toMatch('https://www.instagram.com/goodreads/');})
       });
       it('should connect to linkedin ', () => {
        connect.navigateTo();
        linkedin=connect.getLinkedIn();
        linkedin.click().then(function(){
            expect(browser.driver.getCurrentUrl()).toMatch('https://www.linkedin.com/company/goodreads-com/');})
       });


   

});
    /******************************************************************************************************* */
