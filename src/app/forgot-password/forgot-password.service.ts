import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Forgot Password Service
 * @export
 * @class ForgotPasswordService
 */
@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {

  /**
   * Sends a request using email
   * @param {*} email
   * @memberof ForgotPasswordService
   */
  forgotPassword(email) {
    const data = {
      UserEmail: email,
    };
    this.http.post('https://geeksreads.herokuapp.com/api/users/ForgotPassword', data).subscribe((serverResponse: any) => { }
      , (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * Creates an instance of ForgotPasswordService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof ForgotPasswordService
   */
  constructor(private http: HttpClient, private router: Router) { }
}
