import { BookShelves } from './bookShelves.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';



describe('BookShelves tests', () => {
    let page: BookShelves;
    let Book;
    let WantToRead;
    let Image;
   let checkImg;


    beforeEach(() => {
        page = new BookShelves();
        page.navigateTo();
        Book=page.getBook();
    });


    /******************************************************************************************************* */

    Book.array.forEach(element => {
        WantToRead = page.getWantToRead();
        Image=page.getImage();
        WantToRead.click().then(function(){
            browser.get('/book');
            checkImg=element(by.class('Book-image'));
            checkImg.array.forEach(element => {
                if(checkImg==Image){
                    it('Valid');
                }
            });

        })
    });

});
