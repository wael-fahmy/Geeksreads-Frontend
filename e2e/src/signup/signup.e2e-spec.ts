import { LoginPage } from './signup.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { testCases as emailTestCases } from './testCases-signup-email';
import { testCases as pwdTestCases } from './testCases-signup-pwd';
import { testCases as nameTestCases } from './testCases-signup-name';

// import * as fooo from 'testCases-Sign-up-email.json';

describe('Login tests', () => {
    let page: LoginPage;
    let emailBox;
    let pwdBox;
    let nameBox;
    let sumbitBtn;
    let form;


    beforeEach(() => {
        page = new LoginPage();
        page.navigateTo();
        emailBox = page.getEmailTextbox();
        pwdBox = page.getPasswordTextbox();
        nameBox = page.getNameTextbox();
        sumbitBtn = page.getSubmitButton();
        form = page.getForm();
    });


    /******************************************************************************************************* */
    // EMAIL

    emailTestCases.valid.forEach((testCase) => {
        it('Sign-up form: EMAIL INPUT : ' + testCase + '   SHOULD BE : VALID', () => {
            emailBox.clear().then(() => {
                emailBox.sendKeys(testCase).then(() => {
                    expect(emailBox.getAttribute('class')).toContain('ng-valid');
                });
            });
        });
    });

    emailTestCases.invalid.forEach((testCase) => {
        it('Sign-up form: EMAIL INPUT : ' + testCase + '   SHOULD BE : INVALID', () => {
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
        it('Sign-up form: PASSWORD INPUT : ' + testCase + '   SHOULD BE : VALID', () => {
            pwdBox.clear().then(() => {
                pwdBox.sendKeys(testCase).then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-valid');
                });
            });
        });
    });


    pwdTestCases.invalid.forEach((testCase) => {
        it('Sign-up form: PASSWORD INPUT : ' + testCase + '   SHOULD BE : INVALID', () => {
            pwdBox.clear().then(() => {
                pwdBox.sendKeys(testCase).then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-invalid');
                });
            });
        });
    });

    /******************************************************************************************************* */
    // NAME

    nameTestCases.valid.forEach((testCase) => {
        it('Sign-up form: NAME INPUT : ' + testCase + '   SHOULD BE : VALID', () => {
            pwdBox.clear().then(() => {
                pwdBox.sendKeys(testCase).then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-valid');
                });
            });
        });
    });


    nameTestCases.invalid.forEach((testCase) => {
        it('Sign-up form: NAME INPUT : ' + testCase + '   SHOULD BE : INVALID', () => {
            pwdBox.clear().then(() => {
                pwdBox.sendKeys(testCase).then(() => {
                    expect(pwdBox.getAttribute('class')).toContain('ng-invalid');
                });
            });
        });
    });
});
