import { Books } from './comment.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Book tests', () => {
    let page: Books;
    let comment;


    beforeEach(() => {
        page = new Books();
    });

      it('after clicking on comment should redirect to reviews page', () => {
          page.navigateTo();
        comment=page.getComment();
        comment.click().then(function(){
            expect(browser.get('/reviews'));})
      });



});
    /******************************************************************************************************* */
