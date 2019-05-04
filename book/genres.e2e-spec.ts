import { Books } from './genres.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Book tests', () => {
    let page: Books;
    let genres;
    let moreAboutGenres;

    beforeEach(() => {
        page = new Books();
    });


  
    it('Genres should be hidden', () => {
        page.navigateTo();
        genres=page.getGenres();
        moreAboutGenres=page.getmoreaboutGenres();
        expect(moreAboutGenres.isDisplayed()).toBeFalsy; 
  
      });
      it('should display Genres', () => {
        page.navigateTo();
        genres=page.getGenres();
        moreAboutGenres=page.getmoreaboutGenres();
          genres.click().then(function(text){
                  expect(moreAboutGenres.isDisplayed()).toBeTruthy; 
          })

  
      });
      it('should hide Genres', () => {
        page.navigateTo();
        genres=page.getGenres();
        moreAboutGenres=page.getmoreaboutGenres();
          genres.click().then(function(text){
                  expect(moreAboutGenres.isDisplayed()).toBeFalsy; 
      });
  
      });


});
    /******************************************************************************************************* */
