// import { Books } from './bookPage.po';
// import { browser, logging } from 'protractor';
// import { protractor } from 'protractor/built/ptor';
// import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';
// import { elementStyleProp } from '@angular/core/src/render3';



// describe('Book tests', () => {
//     let page: Books;
//     let like;
//     let comment;
//     // let before;
//     let follow;
//     let bookDetails;
//     let form;

//     beforeEach(() => {
//         page = new Books();
//         form =  page.getForm();
//     });


//     it('Testing of like (like then unlike then like)', () => {
//         page.navigateTo();
//         like = page.getLike();
//         let before = like.getText();
//         like.click().then(() => {
//             if (before === 'like') {
//                 expect(like.getText()).toContain('Liked');
//             } else if (before === 'liked') {
//                 expect(like.getText()).toContain('Like');
//             }
//         });
//         before = like.getText();
//         like.click().then( () => {
//             if (before === 'like') {
//                 expect(like.getText()).toContain('Liked');
//             } else if (before === 'liked') {
//                 expect(like.getText()).toContain('Like');
//             }
//         });
//         before = like.getText();
//         like.click().then( () => {
//             if (before === 'like') {
//                 expect(like.getText()).toContain('Liked');
//             } else if (before === 'liked') {
//                 expect(like.getText()).toContain('Like');
//             }
//         });
//     });


//     it('after clicking on comment should redirect to reviews page', () => {
//         comment = page.getComment().then(() =>
//         expect(comment.getText()).toContain,
//         comment.click().then(() => {
//             expect(browser.get('/reviews'));
//         }));
//     });



//     it('should show details of the book and then hide it', () => {
//         page.navigateTo();
//         bookDetails = page.getBookDetails();
//         bookDetails.click().then( () => {
//             expect(element(by.id('cdk-accordion-child-1')).isDisplayed()).toBeTruthy();
//         });
//         bookDetails.click().then( () => {
//             expect(element(by.id('cdk-accordion-child-1')).isDisplayed()).toBeFalsy();
//         });

//     });
//     it('should show details about author and press follow then unfollow then follow then hide the details about the author', () => {
//         bookDetails = page.getBookDetails();
//         bookDetails.click().then( () => {
//             expect(element(by.id('mat-expansion-panel-header-2')).isDisplayed()).toBeTruthy();
//         });
//         bookDetails.click().then( () => {
//             expect(element(by.id('mat-expansion-panel-header-2')).isDisplayed()).toBeFalsy();
//         });


//     });
//     it('Testing of Follow author(clicking on the button 3 times should change from follow to unfollow and vice versa', () => {
//         element(by.id('about-this-author')).click();
//         follow = page.getFollow();
//         let before = follow.getText();
//         follow.click().then( () => {
//             if (before === 'Follow Author') {
//                 expect(follow.getText()).toContain('Unfollow Author');
//             } else if (before === 'Unfollow Author') {
//                 expect(follow.getText()).toContain('Follow Author');
//             } else {
//                 expect(follow.getText()).toContain('Follow Author' || 'Unfollow Author') ;
//                    }
//         });
//         before = follow.getText();
//         follow.click().then( () => {
//             if (before === 'Follow Author') {
//                 expect(follow.getText()).toContain('Unfollow Author');
//             } else if (before === 'Unfollow Author') {
//                 expect(follow.getText()).toContain('Follow Author');
//             } else {
//                 expect(follow.getText()).toContain('Follow Author' || 'Unfollow Author');
//             }
//         });
//         before = follow.getText();
//         follow.click().then( () => {
//             if (before === 'Follow Author') {
//                 expect(follow.getText()).toContain('Unfollow Author');
//             } else if (before === 'Unfollow Author') {
//                 expect(follow.getText()).toContain('Follow Author');
//             } else {
//                 expect(follow.getText()).toContain('Follow Author' || 'Unfollow Author');
//                    }
//         });
//     });
//     it('should display author discription and then hide it', () => {
//         //  element(by.id('about-this-author')).click();
//         element(by.id('myBtn-author-discription')).getText().then( (text) => {
//             if (text === 'Read more') {
//                 expect(element(by.id('more-author-discription')).isDisplayed()).toBeFalsy();
//                 expect(element(by.id('dots-author-discription')).isDisplayed()).toBeTruthy();
//             } else if (text === 'Read less') {
//                 expect(element(by.id('more-author-discription')).isDisplayed()).toBeTruthy();
//                 expect(element(by.id('dots-author-discription')).isDisplayed()).toBeFalsy();
//             }
//         });
//         element(by.id('myBtn-author-discription')).click();
//         element(by.id('myBtn-author-discription')).getText().then( (text) => {
//             if (text === 'Read more') {
//                 expect(element(by.id('more-author-discription')).isDisplayed()).toBeFalsy();
//                 expect(element(by.id('dots-author-discription')).isDisplayed()).toBeTruthy();
//             } else if (text === 'Read less') {
//                 expect(element(by.id('more-author-discription')).isDisplayed()).toBeTruthy();
//                 expect(element(by.id('dots-author-discription')).isDisplayed()).toBeFalsy();
//             }

//         });

//     });
// });
