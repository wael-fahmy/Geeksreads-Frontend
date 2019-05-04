import { AuthorUnfollowModel } from './author-unfollow-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * Author Unfollow Service Class
 * @export
 * @class AuthorUnfollowService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorUnfollowService {

  /**
   *  Object to fill
   *  @private
   *  @type {Author}
   *  @memberof AuthorService
   */
  private unfollowing: AuthorUnfollowModel;

  /**
   * Subject Object
   * @private
   * @memberof AuthorService
   */
  private unfollowingUpdated = new Subject<AuthorUnfollowModel>();

  /**
   * Unfollows Author
   * @memberof AuthorService
   */
  unfollowAuthor(snapshotParam: string) {
    // Can't unfollow if you are a Guest
    if (localStorage.getItem('userId') === null) {
      this.router.navigate(['/sign-in']);
      return;
    }

    const data = {
      myuserId: localStorage.getItem('userId'),
      auth_id: snapshotParam,
      token: localStorage.getItem('token'),
    };

    this.http
      .post('https://geeksreads.herokuapp.com/api/authors/unfollow', data)
      .subscribe((serverResponse: AuthorUnfollowModel) => {
        console.log('Unfollow Author Service: ' + serverResponse);
        this.unfollowing = serverResponse;
        this.unfollowingUpdated.next(this.unfollowing);
      }, (error: { json: () => void; }) => {
        console.log(error.json);
      });
  }

  /**
   * To update unfollow info
   * @returns
   * @memberof AuthorService
   */
  getUnfollowAuthorUpdated() {
    return this.unfollowingUpdated.asObservable();
  }

  /**
   * Creates an instance of AuthorUnfollowService.
   * @memberof AuthorUnfollowService
   */
  constructor(private http: HttpClient, private router: Router) { }
}

