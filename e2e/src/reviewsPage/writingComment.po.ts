import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class    Comments {
    navigateTo() {
       browser.get('/book').then(()=>{
        var comment=element(by.cssContainingText('p', 'Comment'));
        comment.click()});  
    }


    getCommentBox(){
        return element(by.id('user-input'))
    }
    getPost(){
        return element(by.id('comment-send-bt'))
    }
    getNumberOfComments(){
        return element(by.id('show-comments')).getText();

    }
    getComments(){
        return element.all(by.id('user-comment'))
    }

   

}
