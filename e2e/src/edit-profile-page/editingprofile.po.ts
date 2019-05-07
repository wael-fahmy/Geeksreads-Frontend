import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';

export class LoginPage {
    navigateTo() {
        browser.get('http://localhost:4200');
        return browser.get('/profile-edit');
    }
    navigateTonew() {
        browser.get('http://localhost:4200');
        return browser.get('/profile');
    }
    navigateTosignin() {
        browser.get('http://geeksreads.herokuapp.com/');
        return browser.get('/sign-in');
    }

    getEmailaignin() {
        return element(by.name('email'));
    }

    getPasswordsignin() {
        return element(by.name('password'));
        // by.css('[type="text"]') // visible in screenshots?
    }

    getFormsignin() {
        return element(by.className('sign-in-form'));
    }

    getSubmitButtonsignin() {
        return element(by.id('form-submit-btn'));
    }

    geticon() {
        return element(by.className('mat-icon notranslate material-icons mat-icon-no-color'));
    }

    getclickprofile() {
        return element(by.id('profile-route'));
    }
    gettoeditprofile() {
        return element(by.id('profile-button'));
    }

    getusernameTextbox() {
        return element(by.name('userName'));
    }
    // getusernameofprofileTextbox() {
    //     return element(by.id('user-name')).getText();
    // }

    getemailTextbox() {
        return element(by.name('email'));
    }

    getPasswordTextbox() {
        return element(by.name('oldpass'));
    }
    getPasswordnewTextbox() {
        return element(by.name('newpass'));
    }
    getusermenu() {
        return element(by.className('user-menu'));
    }
    getFormofprofile() {
        return element(by.className('ng-star-inserted'));
    }

    getForm() {
        return element(by.className('profile-edit'));
    }

    getSubmitButton() {
        // e7tmal yghyaro el class name da w y7oto id, msh 3rfa
        return element(by.id('saveButton'));
    }
    getdate() {

        // date button
        return element(by.model('myDate'));
    }
    getcalender() {

        // date button
        return element(by.className('mat-calendar-body-cell-content mat-calendar-body-selected'));
    }

    getdateclass() {

        // date button
        return element(by.id('mat-input-12'));
    }
}
