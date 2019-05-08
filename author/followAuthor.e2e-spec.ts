import { author } from './followAuthor.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Go to author of the book', () => {
    let page: author;
   // let before;
    let follow;
    let unfollow;
    let numberofFollowers;
    let first;

    beforeEach(() => {
        page = new author();
    });
      //follow author
      it('Testing of Follow author', ()=> {
          page.signIn();
           browser.waitForAngular('30000').then(()=>{  
          page.navigateTo();
          browser.waitForAngular('30000').then(()=>{ 
        if(page.getFollow().isDisplayed()){
            follow=page.getFollow();
            follow.click().then(function(){
                var hasStorage = (function() {
                    try {
                       var signedin= localStorage.getItem('token');
                        if(signedin)
                            {   first=true;
                                expect(follow.isDisplayed()).toBeFalsy;}
                        else{
                            first=false;
                            expect(browser.getCurrentUrl()).toMatch(('/sign-in'));
                        }
                    } catch (exception) {
                        return false;
                    }
                }());
            });
        }
       else{
        unfollow=page.getUnfollow();
        unfollow.click().then(function(){
            var hasStorage = (function() {
                try {
                   var signedin= localStorage.getItem('token');
                    if(signedin)
                        {   first=true;
                            expect(unfollow.isDisplayed()).toBeFalsy;}
                    else{
                        first=false;
                        expect(browser.getCurrentUrl()).toMatch(('/sign-in'));
                    }
                } catch (exception) {
                    return false;
                }
            }());
        });
       }
           });
        });
    });
    if(first){
            it('Testing of unFollow author', () => {
        
                if(page.getFollow().isDisplayed()){
                    follow=page.getFollow();
                    follow.click().then(function(){
                         expect(follow.isDisplayed()).toBeFalsy;
                     
                    });
                }
               else{
                unfollow=page.getUnfollow();
                unfollow.click().then(function(){
                    
                         expect(unfollow.isDisplayed()).toBeFalsy;
                });
               }
                })
                    
            //change number of the followers
            it('should change in the number of followers',()=>{
                var numberofFollowerssBefore=Number(page.getNumberOfFollowers().getText());
                numberofFollowers=page.getNumberOfFollowers();
                if(page.getFollow().isDisplayed()){
                    follow=page.getFollow();
                    follow.click().then(function(){
                        expect( Number(numberofFollowers.getText())).toEqual(numberofFollowerssBefore-1);
                     
                    });
                }
               else{
                unfollow=page.getUnfollow();
                unfollow.click().then(function(){
                    expect( Number(numberofFollowers.getText())).toEqual(numberofFollowerssBefore+1);
                });
            }
            });
           
            
                it('should change in the number of followers',async function (){
                    var numberofFollowerssBefore=Number(page.getNumberOfFollowers().getText());
                    numberofFollowers=page.getNumberOfFollowers();
                    if(page.getFollow().isDisplayed()){
                        follow=page.getFollow();
                        follow.click().then(function(){
                            expect( Number(numberofFollowers.getText())).toEqual(numberofFollowerssBefore-1);
                         
                        });
                    }
                   else{
                    unfollow=page.getUnfollow();
                    unfollow.click().then(function(){
                        expect( Number(numberofFollowers.getText())).toEqual(numberofFollowerssBefore+1);
                    });
                }
  
  });}
});
    /******************************************************************************************************* */
