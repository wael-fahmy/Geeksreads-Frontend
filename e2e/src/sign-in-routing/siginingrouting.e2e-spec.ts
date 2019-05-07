import { LoginPage } from './signing.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { element } from '@angular/core/src/render3';
import { RouterModule } from '@angular/router';



describe('Login tests', () => {
    let page: LoginPage;
    let form;
    let clickedit;


    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
        form = page.getForm();
        clickedit = page.getbuttonclick();
    });



    it('Should Redirect to sign in page when he clicks sign in button', () => {

        browser.getCurrentUrl().then((url) =>
        expect(url).toBe('http://localhost:4200/sign-in'));
        });


});
