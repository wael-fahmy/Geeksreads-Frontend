import { LoginPage } from './editingprofile.po';
import { browser, logging, by, ElementFinder, ElementArrayFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { element } from '@angular/core/src/render3';
// import { url } from 'inspector';
import { RouterModule } from '@angular/router';
import { domRendererFactory3 } from '@angular/core/src/render3/interfaces/renderer';
import { doesNotThrow } from 'assert';
import { resolve } from 'url';


describe('Editing profile', () => {
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
    let photo;
    let upload;
    // let remote;
    let fileToUpload;
    let absolutePath;
    let path;

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
        photo = page.clickBrowsephoto();
        upload = page.clickuploadphoto();
    });

    /******************************************************************************************************* */



    // it('Editing username to be (Monaliza) and Routing to profile page to check it', () => {
    //     browser.get('/sign-in');
    //     emailsignin.sendKeys('ayahossam_95@hotmail.com');
    //     passsignin.sendKeys('tmam123'),
    //         clicksignin.click(),
    //         browser.waitForAngular('30000'),
    //         browser.get('/profile-edit'),
    //         username.clear(),
    //         username.sendKeys('Monaliza'),
    //         pwdBox.sendKeys('tmam123'),
    //         newpass.sendKeys('tmam123'),
    //         sumbitBtn.click(),
    //         browser.waitForAngular('900000').then(() => {
    //             browser.get('http://localhost:4200/profile');
    //             browser.waitForAngular('990000');
    //             browser.getCurrentUrl().then((url) =>
    //                 expect(url).toBe('http://localhost:4200/profile'));
    //             browser.ignoreSynchronization = false;
    //         });
    // });



    it('Changing The Profile Photo and Routing to profile page to check it', done => {
        browser.get('/sign-in');
        emailsignin.sendKeys('ayahossam_95@hotmail.com');
        passsignin.sendKeys('tmam123'),
        clicksignin.click(),
        browser.waitForAngular('30000'),
        browser.get('/profile-edit'),
        // username.clear(),
        browser.waitForAngular('30000'),
        photo.click(),

///////////////// Photo //////////
        fileToUpload = ('../PicturesL/testingpicture.jpg'),
        absolutePath = path.resolve(__dirname, fileToUpload),
        // console.log(absolutePath);
        // this.upload.sendKeys(absolutePath);
        // browser.actions().sendKeys(protractor.Key.ENTER).perform(),
        upload.sendKeys(absolutePath),
        browser.actions().sendKeys(protractor.Key.ENTER).perform(),

        browser.waitForAngular('90000'),
        pwdBox.sendKeys('tmam123'),
        newpass.sendKeys('tmam123'),
        sumbitBtn.click(),

        browser.waitForAngular('90000').then(() => {
        browser.get('http://localhost:4200/profile');
        browser.waitForAngular('90000');
        browser.getCurrentUrl().then((url) =>
        expect(url).toBe('http://localhost:4200/profile'));
        browser.ignoreSynchronization = false;
        done();

            }).catch(err => {
                throw err;
    });

    // browser.driver.sleep(300000);
    // browser.waitForAngular('3000000');
    // browser.wait(browser.switchTo().alert().accept());
    // browser.waitForAngular('30000000');
    // browser.get('/profile');
    // browser.driver.sleep(30000);
    // browser.waitForAngular('30000').then(() => {
    // datee.sendKeys('01/01/2000'),
    //     sumbitBtn.click().then(() => {
    // expect(datecheck.getAttribute('class').toContain('ng-valid'));

    // });

    });


});
