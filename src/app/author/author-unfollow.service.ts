import { AuthorUnfollowModel } from './author-unfollow-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * Unfollow Author Servuce
 * @export
 * @class AuthorUnfollowService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorUnfollowService {
  /**
   * Server Url
   * @type {'https://geeksreads.herokuapp.com/api/authors/follow'}
   * @memberof AuthorUnfollowService
   */
  apiURL: 'https://geeksreads.herokuapp.com/api/authors/follow';

  /**
   * Subject Object
   * @private
   * @memberof AuthorService
   */
  private unfollowingUpdated = new Subject<AuthorUnfollowModel>();

  /**
   *  Object to fill
   *  @private
   *  @type {Author}
   *  @memberof AuthorService
   */
  private unfollowing: AuthorUnfollowModel;

  /**
   * Unfollows Author
   * @memberof AuthorService
   */
  unfollowAuthor() {
    if (localStorage.getItem('userId') === null) {
      this.router.navigate(['/sign-in']);
      return;
    }
    const data = {
      myuserId: localStorage.getItem('userId'),
      auth_id: '5c911452938ffea87b4672d7',
    };
    this.http
      .post('https://geeksreads.herokuapp.com/api/authors/unfollow', data)
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
        this.unfollowing.message = serverResponse.Message;
        this.unfollowing.success = serverResponse.success;
        this.unfollowingUpdated.next(this.unfollowing);
      }, (error: { json: () => void; }) => {
        console.log(error.json);
      });
  }

  /**
   *
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
