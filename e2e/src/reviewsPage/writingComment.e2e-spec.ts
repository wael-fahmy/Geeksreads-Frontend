import { Comments } from './writingComment.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';
import { invalid } from '@angular/compiler/src/render3/view/util';



describe('Reviews page tests', () => {
    let page: Comments;
    let commentBox;
    let numberOfComments;
    let postBtn;
    let comments;



    beforeEach(() => {
        page = new Comments();
    });

    
    it('Testing of comment on review(clicking on post without writing anything in the box)', () => {
        page.navigateTo();
        browser.waitForAngular('30000').then(()=>{ 
        commentBox=page.getCommentBox();
        numberOfComments=Number(page.getNumberOfComments());
        comments=page.getComments().count();
        postBtn=page.getPost();
            postBtn.click().then(()=>{
                promise.all([
                    expect(Number(page.getNumberOfComments())).toEqual(numberOfComments),
                expect(page.getComments().count()).toEqual(comments)])
               
        });
        });
      });
      it('Testing of comment on review(posting a comment should increase number of comments)', () => {
        commentBox=page.getCommentBox();
        numberOfComments=Number(page.getNumberOfComments());
        comments=page.getComments().count();
        postBtn=page.getPost();
       commentBox.sendKeys('new comment').then(() => {
            postBtn.click().then(()=>{

                promise.all([
                    expect(Number(page.getNumberOfComments())).toEqual(numberOfComments+1),
                expect(page.getComments().count()).toEqual(comments+1)])
                expect(page.getComments().get(comments-1).getText()).toContain('new comment')
        
        });
        });
      });

});
    /******************************************************************************************************* */
