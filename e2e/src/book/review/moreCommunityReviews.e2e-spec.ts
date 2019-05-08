import { Books } from './moreCommunityReviews.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Book tests', () => {
    let page: Books;
    let communityReviews;

    beforeEach(() => {
        page = new Books();
    });
    it('should display 2 community reviews only)', () => {
      page.navigateTo();
      var count=0;
      communityReviews=page.getMoreReviews();//  element(by.id('about-this-author')).click();
        communityReviews.getText().then(function(text){
              element(by.cssContainingText('p', 'Comment')).isDisplayed().then(function (isVisible) {
                  if (isVisible) {
                      count=count+1;
                  } else {
                      // element is not visible
                  }
              });
              element.all(by.cssContainingText('p', 'Comment')).count().then(function(countComment){
                if(countComment>2){
                  Promise.all([ 
                     expect(count<=2),
                    expect(text==="Load More Community Reviews")
                    ]) }
                    });
                });
              });
              
      it('should display more community reviews', () => {
        var count=0;
        communityReviews=page.getMoreReviews();//  element(by.id('about-this-author')).click();
        communityReviews.click(); 
        communityReviews.getText().then(function(text){
              if(text==="Load More Community Reviews"){
                element(by.cssContainingText('p', 'Comment')).isDisplayed().then(function (isVisible) {
                    if (isVisible) {
                        count=count+1;
                    } else {
                        // element is not visible
                    }
                });
                  expect(count<=2) }
            else  if(text==="Load Less Community Reviews"){
              element(by.cssContainingText('p', 'Comment')).isDisplayed().then(function (isVisible) {
                if (isVisible) {
                    count=count+1;
                } else {
                    // element is not visible
                }
            });

            element.all(by.cssContainingText('p', 'Comment')).count().then(function(countComment){
              if(countComment>2){
                Promise.all([
                  expect(count>2)]) }
                  });
 }
          
          });
         
      });
      
      it('should display less community reviews', () => {
        var count=0;
        communityReviews=page.getMoreReviews();//  element(by.id('about-this-author')).click();
        communityReviews.click();  
        communityReviews.getText().then(function(text){
              if(text==="Load More Community Reviews"){
                element(by.cssContainingText('p', 'Comment')).isDisplayed().then(function (isVisible) {
                    if (isVisible) {
                        count=count+1;
                    } else {
                        // element is not visible
                    }
                });
                  expect(count<=2) }
            else  if(text==="Load Less Community Reviews"){
              element(by.cssContainingText('p', 'Comment')).isDisplayed().then(function (isVisible) {
                if (isVisible) {
                    count=count+1;
                } else {
                    // element is not visible
                }
            });
            element.all(by.cssContainingText('p', 'Comment')).count().then(function(countComment){
              if(countComment>2){
                Promise.all([
                  expect(count>2)]) }
                  }); }

  
});
});
    });
    /******************************************************************************************************* */
