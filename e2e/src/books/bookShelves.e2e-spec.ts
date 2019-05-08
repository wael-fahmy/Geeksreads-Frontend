// import { BookShelves } from './bookShelves.po';
// import { browser, logging } from 'protractor';
// import { protractor } from 'protractor/built/ptor';
// import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';



// describe('BookShelves tests', () => {
//     let page: BookShelves;
//     let Book;
//     let WantToRead;
//     let Image;
//     let checkImg;


//     beforeEach(() => {
//         page = new BookShelves();
//         page.navigateTo();
//         Book = page.getBook();
//         WantToRead = page.getWantToRead();
//         Image = page.getImage();
//     });


//     /******************************************************************************************************* */

//     it('Rout to books page and check the book image', () => {

//         browser.get('http://localhost:4200/book');
//         browser.waitForAngular();
//         browser.getCurrentUrl().then((url) =>
//             expect(url).toBe('http://localhost:4200/book'));
//         checkImg = element(by.class('Book-image'));
//         expect(checkImg.getAttribute('class')).toContain('ng-valid');

//     });


// });


