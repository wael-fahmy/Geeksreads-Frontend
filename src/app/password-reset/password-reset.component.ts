import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  /**
   * Later
   * @type {boolean}
   * @memberof PasswordResetComponent
   */
  hide = true;

  /**
   * User's password hashed
   * @type {String}
   * @memberof PasswordResetComponent
   */
  userPassword = '';

  /**
   * Token
   * @type {String}
   * @memberof PasswordResetComponent
   */
  token = '';

  /**
   * test request for sign in
   * @memberof Password
   */
  requestNewPassword() {
    const data = {
      token: this.token,
      UserPassword: this.userPassword
    };
    this.http
      .post('https://geeksreads.herokuapp.com/api/ChangeForgotPassword', data)
      .subscribe((serverResponse: any) => {

      }, (error: { json: () => void; }) => {
        console.log(error.json);
      });
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

}
