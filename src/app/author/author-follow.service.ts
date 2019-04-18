import { AuthorFollowModel } from './author-follow-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * Follow Author Service
 * @export
 * @class AuthorFollowService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorFollowService {
  /**
   * Server Url
   * @type {string}
   * @memberof AuthorService
   */
  apiURL: 'https://geeksreads.herokuapp.com/api/authors/follow';

  /**
   *  Object to fill
   *  @private
   *  @type {Author}
   *  @memberof AuthorService
   */
  private following: AuthorFollowModel;

  /**
   * Subject Object
   * @private
   * @memberof AuthorService
   */
  private followingUpdated = new Subject<AuthorFollowModel>();

  /**
   * Follows Author
   * @memberof AuthorService
   */
  followAuthor() {
    if (localStorage.getItem('userId') === null) {
      this.router.navigate(['/sign-in']);
      return;
    }
    this.http
      .post('https://geeksreads.herokuapp.com/api/authors/follow', {
        params: {
          myuserId: localStorage.getItem('userId'),
          auth_id: '5c911452938ffea87b4672d7',
        }
      })
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
        this.following.message = serverResponse.Message;
        this.following.success = serverResponse.success;
        this.followingUpdated.next(this.following);
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   *
   * To update follows info
   * @returns
   * @memberof AuthorService
   */
  getFollowAuthorUpdated() {
    return this.followingUpdated.asObservable();
  }

  /**
   * Creates an instance of AuthorFollowService.
   * @memberof AuthorFollowService
   */
  constructor(private http: HttpClient, private router: Router) { }
}
