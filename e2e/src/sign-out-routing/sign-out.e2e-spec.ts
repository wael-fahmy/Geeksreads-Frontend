import { LoginPage } from './sign-out.po';
import { browser, logging, by, promise, ElementFinder, ElementArrayFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { element } from '@angular/core/src/render3';
import { RouterModule } from '@angular/router';



describe('Logout tests', () => {
    let page: LoginPage;
    let form;
    let clickedit;
    let icon;
    let sigmincomp;
    let join;
    let navigatesignin;
    let formsignin;
    let emailsignin;
    let passsignin;
    let clicksignin;

    beforeEach(() => {
        page = new LoginPage();

        page = new LoginPage();
        navigatesignin = page.navigateTosignin();
        formsignin = page.getFormsignin();
        emailsignin = page.getEmailaignin();
        passsignin = page.getPasswordsignin();
        clicksignin = page.getSubmitButtonsignin();
        page.navigateTo();
        icon = page.geticon();
        clickedit = page.getusermenu();
        form = page.getForm();
        sigmincomp = page.getnavsignin();
        join = page.getjoin();
    });



    it('Should Sign out Checks to see the join in button if exist now', () => {
        browser.get('/sign-in');
        emailsignin.sendKeys('ayahossam_95@hotmail.com');
        passsignin.sendKeys('tmam123'),
        clicksignin.click(),
        browser.get('/sign-out');
        expect(join.isPresent()).toBeTruthy();


    });


});
