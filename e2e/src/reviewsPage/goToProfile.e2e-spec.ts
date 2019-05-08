import { user } from './goToProfile.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Reviews page tests', () => {
    let page: user;
    let userName;
   // let before;
   

    beforeEach(() => {
        page = new user();
    });

    it('should go to the user profile by clicking on the name', () => {   
            userName=page.getUserName(); 
              page.navigateTo();
              browser.waitForAngular('30000').then(()=>{  
                  expect(browser.getCurrentUrl()).toMatch('http://localhost:4200/profile');  
        });
     
        });
        it('the name of the user should be the same of the user i clicked on', () => {   

                var userNameInTheNewPage=element(by.id('user-name')).getText();
                  expect(userNameInTheNewPage).toMatch(userName);  
        
     
        });
        it('should go to the user profile by clicking on the photo', () => {   
          browser.get('/reviews');
          browser.waitForAngular('30000').then(()=>{  
            userName=page.getUserName(); 
              page.navigatebyImg();
              browser.waitForAngular('30000').then(()=>{  
                  expect(browser.getCurrentUrl()).toMatch('http://localhost:4200/profile');  
        });
      });
        });
        it('the name of the user should be the same of the user i clicked on', () => {   

            var userNameInTheNewPage=element(by.id('user-name')).getText();
              expect(userNameInTheNewPage).toMatch(userName);  
});
});
    /******************************************************************************************************* */
