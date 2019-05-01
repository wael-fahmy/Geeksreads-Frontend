import { DataSharingService } from '../nav-bar/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  signIn(email, password) {
    const data = {
      UserEmail: email,
      UserPassword: password
    };
    this.http
      .post('https://geeksreads.herokuapp.com/api/auth/signin', data)
      .subscribe((serverResponse: any) => {
        this.dataSharingService.isUserLoggedIn.next(true);
        localStorage.setItem('token', serverResponse.Token);
        localStorage.setItem('userId', serverResponse.UserId);
        this.router.navigate(['/newsfeed']);
      }, (error: { json: () => void; }) => {
        console.log(error.json);
      });
  }
  constructor(private http: HttpClient,
              private router: Router,
              private dataSharingService: DataSharingService) { }
}
