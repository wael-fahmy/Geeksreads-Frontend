import { LoginPage } from './editprofile.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { element } from '@angular/core/src/render3';
import { RouterModule } from '@angular/router';



describe('Profile tests', () => {
    let page: LoginPage;
    let form;
    let clickedit;


    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
        form = page.getForm();
        clickedit = page.getbuttonclick();
    });



    it('Should Redirect to Edit Profile when he clicks edit button', () => {
        browser.getCurrentUrl().then((url) =>
        expect(url).toBe('http://localhost:4200/profile-edit'));
        });


});
