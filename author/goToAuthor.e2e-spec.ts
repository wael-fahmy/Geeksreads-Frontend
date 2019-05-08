import { Author } from './goToAuthor.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Go to author of the book', () => {
    let page: Author;
    let authorName;
   // let before;
    beforeEach(() => {
        page = new Author();
    });

    it('should go to the author page', () => {   
              page.navigateTo();
              browser.waitForAngular('30000').then(()=>{  
                authorName=page.getAuthorName();
                element(by.id('Author-name')).click().then(()=>{
                    var authorNameInTheNewPage=element(by.id('author-name')).getText();
                    expect(authorNameInTheNewPage).toMatch(authorName);  
                })
        });
     
        });
       
      
});
    /******************************************************************************************************* */
