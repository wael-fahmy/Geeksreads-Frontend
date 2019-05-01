import { DataSharingService } from '../nav-bar/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  updatePassword(email, password, Token) {
    const data = {
      UserEmail: email,
      NewUserPassword: password,
      token: Token,
    };
    this.http
      .post('https://geeksreads.herokuapp.com/api/users/ChangeForgotPassword', data)
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }
  constructor(private http: HttpClient) { }
}
