import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  forgotPassword(email) {
    const data = {
      UserEmail: email,
    };
    this.http
      .post('https://geeksreads.herokuapp.com/api/users/ForgotPassword', data)
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }
  constructor(private http: HttpClient,
              private router: Router) { }
}
