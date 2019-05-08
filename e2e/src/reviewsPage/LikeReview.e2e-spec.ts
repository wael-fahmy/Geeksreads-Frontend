import { reviews } from './likeReview.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';
import { invalid } from '@angular/compiler/src/render3/view/util';



describe('Reviews page tests', () => {
    let page: reviews;
    let like;
    let showLikes;


    beforeEach(() => {
        page = new reviews();
    });


    it('Testing of like review', () => {
        page.navigateTo();
        like=page.getLike();
       var before=like.getText();
       before.then(console.log);
       browser.sleep(30000);
        like.click().then(function(){
            if(before==='Like'){
                expect(like.getText()).toContain('Liked'); 
            }
            else if(before==='Liked'){
                expect(like.getText()).toContain('Like'); 
            }
            else
            expect(invalid)
        })
      });
      it('Testing of unlike review', () => {
        like=page.getLike();
       var before=like.getText();
        like.click().then(function(){
            if(before==="Like"){
                expect(like.getText()).toContain('Liked'); 
            }
            else if(before==="Liked"){
                expect(like.getText()).toContain('Like'); 
            
            }
        else
        expect(invalid)
    })
      });
      it('Testing of like review', () => {
        like=page.getLike();
       var before=like.getText();
        like.click().then(function(){
            if(before==="Like"){
                expect(like.getText()).toContain('Liked'); 
            }
            else if(before==="Liked"){
                expect(like.getText()).toContain('Like'); 
            }
            else
            expect(invalid)
        })
      });
      it('Testing of unlike review(should decrease the number of likes)', () => {
        like=page.getLike();
        showLikes=page.getShowLikes();
        var showLikesBefore=Number(showLikes.getText());
       var before=like.getText();
        like.click().then(function(){
            if(before==="Like"){
                expect(Number(showLikes.getText())).toEqual(showLikesBefore+1);}
                else if(before==="Liked"){
                    expect(Number(showLikes.getText())).toEqual(showLikesBefore-1);}
            })
      });
      it('Testing of like review(should increase the number of likes)', () => {
        like=page.getLike();
        showLikes=page.getShowLikes();
        var showLikesBefore=Number(showLikes.getText());
       var before=like.getText();
        like.click().then(function(){
            if(before==="Like"){
                expect(Number(showLikes.getText())).toEqual(showLikesBefore+1);}
                else if(before==="Liked"){
                    expect(Number(showLikes.getText())).toEqual(showLikesBefore-1);}
      })
          
      });
      it('Testing of unlike review(should decrease the number of likes)', () => {
        like=page.getLike();
        showLikes=page.getShowLikes();
        var showLikesBefore=Number(showLikes.getText());
       var before=like.getText();
        like.click().then(function(){
            if(before==="Like"){
                expect(Number(showLikes.getText())).toEqual(showLikesBefore+1);}
                else if(before==="Liked"){
                    expect(Number(showLikes.getText())).toEqual(showLikesBefore-1);}
      })
      });
      

});
    /******************************************************************************************************* */
