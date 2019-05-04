
import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class Connect {
    navigateTo() {
        return browser.get('/book');
    }
    getFacebook(){
        return element(by.css('a[href*="https://www.facebook.com/Goodreads/"]'))
    }
    getTwitter(){
        return element(by.css('a[href*="https://twitter.com/goodreads"]'))
    }
    getInstagram(){
        return element(by.css('a[href*="https://www.instagram.com/goodreads/"]'))
    }
    getLinkedIn(){
        return element(by.css('a[href*="https://www.linkedin.com/company/goodreads-com/"]'))
    }
}
