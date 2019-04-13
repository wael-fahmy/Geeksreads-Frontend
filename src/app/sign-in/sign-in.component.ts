/**
 *
 * @ignore
 *
 */
import { Component, OnInit } from '@angular/core';
/**
 * @ignore
 */
import { FormControl, Validators, NgForm } from '@angular/forms';
import {HttpClient } from '@angular/common/http';

 /**
  *
  * This is sign in component
  * @export
  * @class SignInComponent
  * @implements {OnInit}
  */
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

/**
 *
 * Sign in component
 *
 * @class SignInComponent
 *
 * @implements {OnInit}
 */

export class SignInComponent implements OnInit {

  /**
   * Later
   * @type {boolean}
   * @memberof SignInComponent
   */
  hide = true;

  /**
   * used to validate input
   * @type {FormControl}
   * @memberof SignInComponent
   */
  email = new FormControl('', [Validators.required, Validators.email]);

  /**
   *
   * User's email entered in the form
   * @type {String}
   * @memberof SignInComponent
   */
  userEmail = '';

  /**
   * User's password hashed
   * @type {String}
   * @memberof SignInComponent
   */
  userPassword = '';


  /**
   * Creates an instance of SignInComponent.
   * @param {HttpClient} http
   * http client module used to make requests to server
   * @memberof SignInComponent
   */
  constructor(private http: HttpClient) {

  }


  /**
   *
   * Checks email
   * @memberof SignInComponent
   */
  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }





  /**
   * test request for sign in
   * @memberof SignInComponent
   */
  testRequest() {
// tslint:disable-next-line: deprecation
    // const data = new URLSearchParams();
    // data.append('email', this.userEmail);
    // data.append('pass', this.userPassword);

    let data = {
      email: this.userEmail ,
      pass: this.userPassword
    };
    console.log('2abl ma ab3at ' , data);
    this.http
      .post('http://localhost:3000/api/sign-in', data)
   // tslint:disable-nextline: variable-name
        .subscribe((serverResponse) => {
          console.log(serverResponse);

          alert('ok ' + serverResponse['message']);

        }, (error: { json: () => void; }) => {
            console.log(error.json());
        });
  }

  /**
   * This function handles user signing in request
   * @param {NgForm} form
   * @memberof SignInComponent
   */
onSigningIn(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('Signing In...');
  }






/**
 *
 *function called on initiallization
 * @memberof SignInComponent
 */
ngOnInit() {}

}


