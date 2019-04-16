import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


/**
 * Sign up component
 * @export
 * @class SignUpComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /**
   * Hide password field and show on eye icon click
   * @type {boolean}
   * @memberof SignUpComponent
   */
  hide = true;

  /**
   * User Email
   * @type {FormControl}
   * object used for validation
   * @memberof SignUpComponent
   *
   */
  email = new FormControl('', [Validators.required, Validators.email]);

  /**
   * User name entered in the form
   * @type {String}
   * @memberof SignUpComponent
   *
   */
  userName = '';

  /**
   * takes userEmail
   * @type {String}
   * @memberof SignUpComponent
   *
   *
   */
  userEmail = '';

  /**
   * User's password hashed
   * @type {String}
   * @memberof SignUpComponent
   */
  userPassword = '';

  /**
   * Checks Email
   * @returns
   * returns text message to user
   * @memberof SignUpComponent
   */
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  /**
   * Tests the sign up component
   * @memberof SignUpComponent
   */
  testRequest() {
    // tslint:disable-next-line: deprecation
    // const data = new URLSearchParams();
    // data.append('userName', this.userName);
    // data.append('userEmail', this.userEmail);
    // data.append('userPassword', this.userPassword);
    const data = {
      UserName: this.userName,
      UserEmail: this.userEmail,
      UserPassword: this.userPassword
    };

    this.http
      .post('https://geeksreads.herokuapp.com/api/users/signup', data)
      .subscribe((serverResponse) => {
        this.router.navigate(['verification']);
      }, error => {
        console.log(error);
      });
  }


  /**
   * Creates an instance of SignUpComponent.
   * @param {HttpClient} http
   * @memberof SignUpComponent
   */
  constructor(private http: HttpClient, public router: Router) { }

  /**
   * function called on initiallization
   * @memberof SignUpComponent
   */
  ngOnInit() { }

}
