import { Books } from './follow.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { elementStyleProp } from '@angular/core/src/render3';



describe('Book tests', () => {
    let page: Books;
   // let before;
    let follow;
    let numberofFollowers;

    beforeEach(() => {
        page = new Books();
    });
    //follow author
    it('Testing of Follow author', () => {
        page.signIn();
        browser.waitForAngular('30000').then(()=>{      
              page.navigateTo();
              browser.waitForAngular('30000').then(()=>{    
            element(by.id('about-this-author')).click();
            follow=page.getFollow();
            var before=follow.getText();
            follow.click().then(function(){
                var hasStorage = (function() {
                    try {
                       var signedin= localStorage.getItem('token');
                        if(signedin)
                            return true;
                        else{
                            return false;
                        }
                    } catch (exception) {
                        return false;
                    }
                }());
              if(hasStorage){
                    expect(follow.getText()).toContain('Unfollow Author');}
                else if(!hasStorage){
                    expect(browser.getCurrentUrl()).toMatch(('/sign-in'));
                }
            });})
        });
     
        });
                it('Testing of unFollow author', () => {
            
                    follow=page.getFollow();
                    var before=follow.getText();
                    follow.click().then(function(){
                        var hasStorage = (function() {
                            try {
                                localStorage.getItem('token');
                                return true;
                            } catch (exception) {
                                return false;
                            }
                        }());
                       if(hasStorage){
                            expect(follow.getText()).toContain('Follow Author'); }
                            else{
                                expect(browser.getCurrentUrl).toMatch(('/sign-in'));
                            }
             
                    })});
                            it('Testing of Follow author', () => {
                                follow=page.getFollow();
                                var before=follow.getText();
                                follow.click().then(function(){
                                    var hasStorage = (function() {
                                        try {
                                            localStorage.getItem('token');
                                            return true;
                                        } catch (exception) {
                                            return false;
                                        }
                                    }());
                                    if(hasStorage){
                                        expect(follow.getText()).toContain('Unfollow Author'); }
                                        else{
                                            expect(browser.getCurrentUrl).toMatch(('/sign-in'));
                                        } 
                                   });});
                //change number of the followers
                it('should change in the number of followers',()=>{
                    numberofFollowers=page.getNumberOfFollowers();
                    follow=page.getFollow();
                    var numberofFollowerssBefore=Number(numberofFollowers.getText());
                    follow.click().then(function(){
                        var hasStorage = (function() {
                            try {
                                localStorage.getItem('token');
                                return true;
                            } catch (exception) {
                                return false;
                            }
                        }());
                        if(hasStorage){
                expect( Number(numberofFollowers.getText())).toEqual(numberofFollowerssBefore+1);}
                else{
                    expect(browser.getCurrentUrl).toMatch(('/sign-in'));
                }
               
                });
                
});
                    it('should change in the number of followers',async function (){
                        numberofFollowers=page.getNumberOfFollowers();
                        follow=page.getFollow();
                        var numberofFollowerssBefore= Number(numberofFollowers.getText());
                       
                        follow.click().then(function(){
                            var hasStorage = (function() {
                                try {
                                    localStorage.getItem('token');
                                    return true;
                                } catch (exception) {
                                    return false;
                                }
                            }());
                           if(hasStorage){
                    expect( Number(numberofFollowers.getText())).toEqual(numberofFollowerssBefore-1);}
                    else{
                        expect(browser.getCurrentUrl).toMatch(('/sign-in'));
                    }
                    });

});
});
    /******************************************************************************************************* */
