import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Password Reset Service
 * @export
 * @class PasswordResetService
 */
@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  /**
   * Updates password
   * @param {*} email
   * @param {*} password
   * @param {*} Token
   * @memberof PasswordResetService
   */
  updatePassword(password, Token) {
    const data = {
      NewUserPassword: password,
      token: Token,
    };
    this.http.post('https://geeksreads.herokuapp.com/api/users/ChangeForgotPassword', data).subscribe((serverResponse: any) => {

    }, (error: { json: () => void; }) => {
      console.log(error);
      alert('Can\'t complete Request');
    });
  }

  /**
   * Creates an instance of PasswordResetService.
   * @param {HttpClient} http
   * @memberof PasswordResetService
   */
  constructor(private http: HttpClient) { }
}
