import { LoginPage } from './editingprofile.po';
import { browser, logging, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { element } from '@angular/core/src/render3';
import { url } from 'inspector';


describe('Editing profile tests', () => {
    let page: LoginPage;
    let username;
    let clickedit;
    // let profileuser;
    let emailBox;
    let pwdBox;
    let newpass;
    let sumbitBtn;
    let form;
    let anotherform;
    let clickprofile;
    let menu;
    let icon;
    let navigatesignin;
    let formsignin;
    let emailsignin;
    let passsignin;
    let clicksignin;
    let newnavigation;
    let datee;
    let calender;
    let datecheck;


    beforeEach(() => {
        page = new LoginPage();
        navigatesignin = page.navigateTosignin();
        formsignin = page.getFormsignin();
        emailsignin = page.getEmailaignin();
        passsignin = page.getPasswordsignin();
        clicksignin = page.getSubmitButtonsignin();
        page.navigateTo();
        icon = page.geticon();
        menu = page.getusermenu();
        clickprofile = page.getclickprofile();
        anotherform = page.getFormofprofile();
        clickedit = page.gettoeditprofile();
        form = page.getForm();

        username = page.getusernameTextbox();
        // profileuser = page.getusernameofprofileTextbox();
        emailBox = page.getemailTextbox();
        pwdBox = page.getPasswordTextbox();
        newpass = page.getPasswordnewTextbox();
        sumbitBtn = page.getSubmitButton();

        newnavigation = page.navigateTonew();
        icon = page.geticon();
        menu = page.getusermenu();
        clickprofile = page.getclickprofile();
        anotherform = page.getFormofprofile();
        datee = page.getdate();
        calender = page.getcalender();
        datecheck = page.getdateclass();
    });

    /******************************************************************************************************* */
    // EMAIL


    it('Editing username to be (new name) and routing to profile page to check it', () => {
        browser.get('/sign-in'),
            emailsignin.sendKeys('ayahossam_95@hotmail.com'),
            passsignin.sendKeys('tmam123'),
            clicksignin.click().then(() => {
                browser.waitForAngular('30000'),
                browser.get('/profile-edit'),
                username.clear().then(() => {
                    username.sendKeys('mona'),
                    pwdBox.sendKeys('tmam123'),
                    newpass.sendKeys('tmam123').then(() => {

                        // browser.driver.sleep(300000);
                        // browser.waitForAngular('3000000');
                        // browser.wait(browser.switchTo().alert().accept());
                        // browser.waitForAngular('30000000');
                        // browser.get('/profile');
                        // browser.driver.sleep(30000);
                        // browser.waitForAngular('30000').then(() => {
                        datee.sendKeys('01/01/2000'),
                        sumbitBtn.click().then(() => {
                        expect(datecheck.getAttribute('class').toContain('ng-valid'));

                        });
                    });
                });
            });
    });


    // it('check that the username is now changed ', () => {
    //     browser.get('/sign-in'),
    //         emailsignin.sendKeys('samersosta@gmail.com'),
    //         passsignin.sendKeys('123456'),
    //         clicksignin.click(),
    //         browser.driver.sleep(30000),
    //         browser.waitForAngular('300000').then(() => {
    //                             browser.get('/profile').then(() => {
    //                                 expect(profileuser.toContain('new name'));
    //                             });
    //                         });
    //                 });


/******************************************************************************************************* */
    // PASSWORD

    // pwdTestCases.valid.forEach((testCase) => {
    //     it('Signin form: PASSWORD INPUT : ' + testCase + '   SHOULD BE : VALID', () => {
    //         pwdBox.clear().then(() => {
    //             pwdBox.sendKeys(testCase).then(() => {
    //                 expect(pwdBox.getAttribute('class')).toContain('ng-valid');
    //             });
    //         });
    //     });
    // });


    // pwdTestCases.invalid.forEach((testCase) => {
    //     it('Signin form: PASSWORD INPUT : ' + testCase + '   SHOULD BE : INVALID', () => {
    //         pwdBox.clear().then(() => {
    //             pwdBox.sendKeys(testCase).then(() => {
    //                 expect(pwdBox.getAttribute('class')).toContain('ng-invalid');
    //             });
    //         });
    //     });
    // });




});
