import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { testCases as emailTestCases } from './testCases-signin-email';
import { testCases as pwdTestCases } from './testCases-signin-pwd';
import { testCases as nameTestCases } from './testCases-signin-name';
import { testCases as allTestCases } from './testCases-signin-withall';

// import * as fooo from 'testCases-signin-email.json';

describe('Login tests', () => {
    let page: LoginPage;
    let emailBox;
    let pwdBox;
    let sumbitBtn;
    let form;


    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
        emailBox = page.getEmailTextbox();
        pwdBox = page.getPasswordTextbox();
        sumbitBtn = page.getSubmitButton();
        form = page.getForm();
    });


    /******************************************************************************************************* */
    // ALL at ONCE: user name, email and password
    // allTestCases.valid.forEach((testCase) => {
    it('Sign-in form with EMAIL and PAsswrod : ' + '"aya.karmo95@gmail.com" and "a1@aya"' + '   SHOULD BE : VALID', () => {

        emailBox.clear().then(() => {
            emailBox.sendKeys('aya.karmo95@gmail.com').then(() => {
                expect(emailBox.getAttribute('class')).toContain('ng-valid');
            });

            pwdBox.clear().then(() => {
                pwdBox.sendKeys('a1@aya').then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-valid');
                });
            });
        });
    });

    /******************************************************************************************************* */
    // ALL at ONCE: user name, email and password
    // allTestCases.valid.forEach((testCase) => {
    it('Sign-in form with EMAIL and PAsswrod : ' + '"ayahossam_95@hotmail.com" and "tmam123"' + '   SHOULD BE : VALID', () => {

        emailBox.clear().then(() => {
            emailBox.sendKeys('ayahossam_95@hotmail.com').then(() => {
                expect(emailBox.getAttribute('class')).toContain('ng-valid');
            });

            pwdBox.clear().then(() => {
                pwdBox.sendKeys('tmam123').then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-valid');
                });
            });
        });
    });

    /******************************************************************************************************* */
    // EMAIL

    // emailTestCases.valid.forEach((testCase) => {
    //     it('Signin form: EMAIL INPUT : ' + testCase + '   SHOULD BE : VALID', () => {
    //         emailBox.clear().then(() => {
    //             emailBox.sendKeys(testCase).then(() => {
    //                 expect(emailBox.getAttribute('class')).toContain('ng-valid');
    //             });
    //         });
    //     });
    // });

    // emailTestCases.invalid.forEach((testCase) => {
    //     it('Signin form: EMAIL INPUT : ' + testCase + '   SHOULD BE : INVALID', () => {
    //         emailBox.clear().then(() => {
    //             emailBox.sendKeys(testCase).then(() => {
    //                 expect(emailBox.getAttribute('class')).toContain('ng-invalid');
    //             });
    //         });
    //     });
    // });

    // /******************************************************************************************************* */
    // // PASSWORD

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
