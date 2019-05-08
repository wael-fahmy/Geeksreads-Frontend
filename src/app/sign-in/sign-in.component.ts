import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SignInService } from './sign-in.service';

/**
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
   * Form Group
   * @type {FormGroup}
   * @memberof SignInComponent
   */
  formdata: FormGroup;

  /**
   * Email
   * @type {FormControl}
   * @memberof SignInComponent
   */
  email: FormControl;

  /**
   * Password
   * @type {FormControl}
   * @memberof SignInComponent
   */
  password: FormControl;

  /**
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
   * SignIn Using Form
   * @memberof SignInComponent
   */
  signIn(formData) {
    try {
      this.signInService.signIn(formData.email, formData.password);
    } catch (error) {
      return;
    }
    // this.snackBar.open('Redirecting', null, {
    //   duration: 1500,
    // });
  }

  /**
   * Validate Passsword
   * @param {*} formcontrol
   * @returns
   * @memberof SignInComponent
   */
  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 6) {
      return { password: true };
    }
  }

  /**
   * Creates an instance of SignInComponent.
   * http client module used to make requests to server
   * @param {HttpClient} http
   * @memberof SignInComponent
   */
  constructor(private http: HttpClient,
              private router: Router,
              public signInService: SignInService,
              private snackBar: MatSnackBar) { }

  /**
   * Function called on initiallization
   * @memberof SignInComponent
   */
  ngOnInit() {
    localStorage.removeItem('token');
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/newsfeed']);
    }
    this.password = new FormControl('', this.passwordvalidation);
    this.email = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*\.[a-z]+')
    ]));
    this.formdata = new FormGroup({
      email: this.email,
      password: this.password
    });
  }
}
