import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../nav-bar/data-sharing.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 *  Signout Component
 *  @export
 *  @class SignOutComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  /**
   * SignOut
   * @memberof SignOutComponent
   */
  signOut() {
    const data = {
      token: localStorage.getItem('token')
    };
    this.http
      .post('https://geeksreads.herokuapp.com/api/users/SignOut', data)
      .subscribe((serverResponse: any) => {
        this.dataSharingService.isUserLoggedIn.next(false);
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
      }, (error: { json: () => void; }) => {
        console.log(error.json);
      });
  }
  /**
   *  Creates an instance of SignOutComponent.
   *  @memberof SignOutComponent
   */
  constructor(private http: HttpClient, private router: Router, private dataSharingService: DataSharingService) { }

  /**
   *  Angular ngOnInit
   * @memberof SignOutComponent
   */
  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/newsfeed']);
    }
    this.signOut();
  }

}
