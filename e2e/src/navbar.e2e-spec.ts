import { AppPage } from './app.po';
import { browser, logging, element, by } from 'protractor';

describe('Navbar', () => {

  beforeEach(() => {
    browser.get('http://geeksreads.herokuapp.com/');
    browser.get('newsfeed'); // before each test navigate to home page.
  });

  //   it('should navigate have login navigation', () => {
  //     expect(element(by.css('nav-link')).getAttribute('class')).toEqual('newsfeed');
  //   });
  // });

  it('testing Navbar', () => {
    browser.sleep(2000).then(() => {
      checkNavbarTexts();
    });
  });

  function checkNavbarTexts() {
    element(by.css('nav-link')).getText().then((text) => { // Promise
      expect(text).toEqual('newsfeed');
    });

    //   element(by.id('list-navbar')).getText().then((text) => { // Promise
    //     expect(text).toEqual('List');
    //   });

    //   element(by.id('create-navbar')).getText().then((text) => { // Promise
    //     expect(text).toEqual('Create');
    //   });
    // }

    function navigateToListPage() {
      element(by.href('newsfeed')).click().then(() => { // first find list-home a tag and than click 
        browser.sleep(2000);
        });
    }
  }
});
