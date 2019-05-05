import { AuthorFollowModel } from './author-follow-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * Author Follow Service Class
 * @export
 * @class AuthorFollowService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorFollowService {
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
  followAuthor(authorId: string) {
    // Can't follow author if you are a Guest
    if (localStorage.getItem('userId') === null) {
      this.router.navigate(['/sign-in']);
      return;
    }
    this.http
      .post('https://geeksreads.herokuapp.com/api/authors/follow', {
        auth_id: authorId,
        myuserId: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
      })
      .subscribe((serverResponse: AuthorFollowModel) => {
        // {success: true, Message: "Sucessfully done"}
        this.following = serverResponse;
        this.followingUpdated.next(this.following);
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
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
