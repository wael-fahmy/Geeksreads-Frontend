import { LoginPage } from './profile.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { element } from '@angular/core/src/render3';
import { RouterModule } from '@angular/router';



describe('Login tests', () => {
    let page: LoginPage;
    let sumbitBtn;
    let form;
    let clickedit;


    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
        sumbitBtn = page.getSubmitButton();
        form = page.getForm();
        clickedit = page.getbuttonclick();
    });



    it('Should Redirect to Edit Profile when he clicks edit button', () => {

        browser.get('http://geeksreads.herokuapp.com/profile-edit');
        browser.waitForAngular();
        browser.getCurrentUrl().then((url) =>
        expect(url).toBe('http://geeksreads.herokuapp.com/profile-edit'));
        });


});
