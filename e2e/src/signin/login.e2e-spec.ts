import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { testCases as emailTestCases } from './testCases-signin-email';
import { testCases as pwdTestCases } from './testCases-signin-pwd';

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
    // EMAIL

    emailTestCases.valid.forEach((testCase) => {
        it('Signin form: EMAIL INPUT : ' + testCase + '   SHOULD BE : VALID', () => {
            emailBox.clear().then(() => {
                emailBox.sendKeys(testCase).then(() => {
                    expect(emailBox.getAttribute('class')).toContain('ng-valid');
                });
            });
        });
    });

    emailTestCases.invalid.forEach((testCase) => {
        it('Signin form: EMAIL INPUT : ' + testCase + '   SHOULD BE : INVALID', () => {
            emailBox.clear().then(() => {
                emailBox.sendKeys(testCase).then(() => {
                    expect(emailBox.getAttribute('class')).toContain('ng-invalid');
                });
            });
        });
    });

    /******************************************************************************************************* */
    // PASSWORD

    pwdTestCases.valid.forEach((testCase) => {
        it('Signin form: PASSWORD INPUT : ' + testCase + '   SHOULD BE : VALID', () => {
            pwdBox.clear().then(() => {
                pwdBox.sendKeys(testCase).then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-valid');
                });
            });
        });
    });


    pwdTestCases.invalid.forEach((testCase) => {
        it('Signin form: PASSWORD INPUT : ' + testCase + '   SHOULD BE : INVALID', () => {
            pwdBox.clear().then(() => {
                pwdBox.sendKeys(testCase).then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-invalid');
                });
            });
        });
    });


});
