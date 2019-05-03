import { Books } from './onlineStores.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Book tests', () => {
    let page: Books;
    let amazonStore;
    let newWindowHandle;
    let libraries;
    let onlineStores;
 

    beforeEach(() => {
        page = new Books();
    });


   
    
               it('should go to amazon website', () => {
                    page.navigateTo();
                    amazonStore=page.getAmazon();
                    amazonStore.click().then(function(){
                        browser.getAllWindowHandles().then(function (handles) {
                            newWindowHandle = handles[1]; // this is your new window
                            browser.switchTo().window(newWindowHandle).then(function () {
                                // fill in the form here
                                expect(browser.driver.getCurrentUrl()).toMatch("https://www.amazon.com/");
                
                            });
                        });
                  });
      });
      it('should go to WorldCat website', () => {
         
        page.navigateTo();
        libraries=page.getLibraries();
        libraries.click().then(function(){
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[2]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://www.worldcat.org/title");
                });
            });
      });
});
it('should go to barnes and noble website', () => {
         
    page.navigateTo();
    onlineStores=page.getOnlineStores();
    onlineStores.click().then(function(){
    element(by.cssContainingText('a', 'Barnes & Noble')).click().then(function(visible){
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[3]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://www.barnesandnoble.com/");
                });
            });
        })
  });
});
it('should go to kobo website', () => {
         
    page.navigateTo();
    onlineStores=page.getOnlineStores();
    onlineStores.click().then(function(){
         element(by.cssContainingText('a', 'Rakuten Kobo')).click();
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[4]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://www.kobo.com/");
                });
            });
        }
   )
  });
  it('should go to Apple Store website', () => {
         
    page.navigateTo();
    onlineStores=page.getOnlineStores();
    onlineStores.click().then(function(){
         element(by.cssContainingText('a', 'Apple Store')).click();
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[5]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://www.apple.com/itunes/");
                });
            });
        }
   )
  });
  it('should go to Google Store website', () => {
         
    page.navigateTo();
    onlineStores=page.getOnlineStores();
    onlineStores.click().then(function(){
         element(by.cssContainingText('a', 'Google Store')).click();
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[6]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://play.google.com/store");
                });
            });
        }
   )
  });
  it('should go to Abe Books website', () => {
         
    page.navigateTo();
    onlineStores=page.getOnlineStores();
    onlineStores.click().then(function(){
         element(by.cssContainingText('a', 'Abe Books')).click();
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[7]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://www.abebooks.com/");
                });
            });
        }
   )
  });
  it('should go to Book Despository website', () => {
         
    page.navigateTo();
    onlineStores=page.getOnlineStores();
    onlineStores.click().then(function(){
         element(by.cssContainingText('a', 'Book Despository')).click();
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[8]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://www.bookdepository.com/");
                });
            });
        }
   )
  });
  it('should go to Indigo website', () => {
         
    page.navigateTo();
    onlineStores=page.getOnlineStores();
    onlineStores.click().then(function(){
         element(by.cssContainingText('a', 'Indigo')).click();
            browser.getAllWindowHandles().then(function (handles) {
                newWindowHandle = handles[9]; // this is your new window
                browser.switchTo().window(newWindowHandle).then(function () {
                    // fill in the form here
                    expect(browser.driver.getCurrentUrl()).toMatch("https://www.chapters.indigo.ca/en-ca/");
                });
            });
        }
   )
  });

});
    /******************************************************************************************************* */
