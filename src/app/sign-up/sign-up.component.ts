import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import {HttpClient } from '@angular/common/http';



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
   * Later
   * @type {boolean}
   * @memberof SignUpComponent
   */
  hide = true;


  /**
   * user email
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
   *
   * user's password hashed
   * @type {String}
   * @memberof SignUpComponent
   *
   */
  userPassword = '';








  /**
   * Creates an instance of SignUpComponent.
   * @param {HttpClient} http
   * @memberof SignUpComponent
   */
  constructor(private http: HttpClient) {

   }





  /**
   *
   * Checks Email
   * @returns
   * returns text message to user
   * @memberof SignUpComponent
   *
   *
   */
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }


  /**
   * tests the sign up component
   * @memberof SignUpComponent
   */
  testRequest() {
    // tslint:disable-next-line: deprecation
        // const data = new URLSearchParams();
        // data.append('userName', this.userName);
        // data.append('userEmail', this.userEmail);
        // data.append('userPassword', this.userPassword);

        let data = {
          UserName : this.userName,
          UserEmail: this.userEmail,
          UserPassword: this.userPassword
        };
        this.http
          .post('https://geeksreads.herokuapp.com/api/users/signup', data)
       // tslint:disable-next-line: variable-name
            .subscribe((serverResponse) => {
                  console.log(serverResponse);
                  alert('ok' + serverResponse['message']);

            }, error => {
              console.log(error)
            });
      }



  /**
   * check if user signed up or not
   * @param {NgForm} form
   * form that user enters data
   * @returns
   * nothing
   * @memberof SignUpComponent
   *
   *
   */
  onSigningUp(form: NgForm) {

    if (form.invalid) {
      return;
    }
    console.log('Signing Up...');
  }


  /**
   * function called on initiallization
   * @memberof SignUpComponent
   */
  ngOnInit() {
  }

}
