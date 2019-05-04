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
        page.navigateTo();
        element(by.id('about-this-author')).click();
        follow=page.getFollow();
        var before=follow.getText();
        follow.click().then(function(){
            if(before=="Follow Author"){
                expect(follow.getText()).toContain('Unfollow Author'); 
            }
            else if(before=="Unfollow Author"){
                expect(follow.getText()).toContain('Follow Author'); 
            }
            else 
            expect(follow.getText()).toContain('Follow Author') || expect(follow.getText()).toContain('Unfollow Author')
        })
     
        });
                it('Testing of unFollow author', () => {
                    
                    element(by.id('about-this-author')).click();
                    follow=page.getFollow();
                    var before=follow.getText();
                    follow.click().then(function(){
                        if(before=="Follow Author"){
                            expect(follow.getText()).toContain('Unfollow Author'); 
                        }
                        else if(before=="Unfollow Author"){
                            expect(follow.getText()).toContain('Follow Author'); 
                        }
                        else 
                        expect(follow.getText()).toContain('Follow Author') || expect(follow.getText()).toContain('Unfollow Author')
                    })});
                            it('Testing of Follow author', () => {
                
                                element(by.id('about-this-author')).click();
                                follow=page.getFollow();
                                var before=follow.getText();
                                follow.click().then(function(){
                                    if(before=="Follow Author"){
                                        expect(follow.getText()).toContain('Unfollow Author'); 
                                    }
                                    else if(before=="Unfollow Author"){
                                        expect(follow.getText()).toContain('Follow Author'); 
                                    }
                                    else 
                                    expect(follow.getText()).toContain('Follow Author') || expect(follow.getText()).toContain('Unfollow Author')
                                })});


                //change number of the followers
                it('should change in the number of followers',()=>{
                    page.navigateTo();
                    numberofFollowers=page.getNumberOfFollowers();
                    element(by.id('about-this-author')).click();
                    follow=page.getFollow();
                    var numberofFollowerssBefore=numberofFollowers.getAttribute('value');
                    follow.click().then(function(){
                expect(numberofFollowers.getAttribute('value')).toEqual(numberofFollowerssBefore+1);

                });
                
});
                    it('should change in the number of followers',()=>{
                        page.navigateTo();
                        numberofFollowers=page.getNumberOfFollowers();
                        element(by.id('about-this-author')).click();
                        follow=page.getFollow();
                        var numberofFollowerssBefore=numberofFollowers.getAttribute('value');
                        follow.click().then(function(){
                    expect(numberofFollowers.getAttribute('value')).toEqual(numberofFollowerssBefore-1);

                    });

});
});
    /******************************************************************************************************* */
