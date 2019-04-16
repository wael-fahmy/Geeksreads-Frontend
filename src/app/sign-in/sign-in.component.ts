import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    const data = {
      UserEmail: this.userEmail,
      UserPassword: this.userPassword
    };
    console.log('Before sending ', data);
    this.http
      .post('https://geeksreads.herokuapp.com/api/auth/signin', data)
      // tslint:disable-nextline: variable-name
      .subscribe((serverResponse) => {
        console.log(serverResponse);
        this.router.navigate(['/newsfeed']);
      }, (error: { json: () => void; }) => {
        console.log(error.json);
      });
  }


  /**
   * Creates an instance of SignInComponent.
   * @param {HttpClient} http
   * http client module used to make requests to server
   * @memberof SignInComponent
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   *
   * function called on initiallization
   * @memberof SignInComponent
   */
  ngOnInit() { }

}
