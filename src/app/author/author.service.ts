import { AuthorModel, AuthorFollowModel, AuthorUnfollowModel } from './author.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

/**
 *  Author Service
 *  @export
 *  @class AuthorService
 */
@Injectable({
  providedIn: 'root'
})

export class AuthorService {

  /**
   * API URL By Name
   * @type {string}
   * @memberof AuthorService
   */
  apiURLByName: 'https://geeksreads.herokuapp.com/api/authors/name';

  /**
   * API URL By ID
   * @type {'https://geeksreads.herokuapp.com/api/authors/id'}
   * @memberof AuthorService
   */
  apiURLById: 'https://geeksreads.herokuapp.com/api/authors/id';

  /**
   *  Object to fill
   *  @private
   *  @type {Author}
   *  @memberof AuthorService
   */
  private author: AuthorModel;

  /**
   *  Subject object
   *  @private
   *  @memberof AuthorService
   */
  private authorUpdated = new Subject<AuthorModel>();

  /**
   *  Get the JSON response and update the author info
   *  @memberof AuthorService
   */
  getAuthorInfo() {
    this.http
      .get(this.apiURLByName, {
        params: {
          auth_name: 'Deena Craig',
        }
      })
      .subscribe((serverResponse: AuthorModel) => {
        this.author = serverResponse;
        console.log(this.author);
        this.authorUpdated.next(this.author);
      }
        , (error: { json: () => void; }) => {
          console.log(error);
        });
  }

  /**
   *  To update the author's info as observed
   *  @returns
   *  @memberof AuthorService
   */
  getAuthorInfoUpdated() {
    return this.authorUpdated.asObservable();
  }

  /**
   *  Creates an instance of AuthorService.
   *  @param {HttpClient} http
   *  @memberof AuthorService
   */
  constructor(private http: HttpClient, private router: Router) { }
}

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

    const data = {
      myuserId: localStorage.getItem('userId'),
      auth_id: '5c911452938ffea87b4672d7',
    };

    this.http
      .post(this.apiURL, data)
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

export class AuthorUnfollowService {
  /**
   * Server Url
   * @type {'https://geeksreads.herokuapp.com/api/authors/follow'}
   * @memberof AuthorUnfollowService
   */
  apiURL: 'https://geeksreads.herokuapp.com/api/authors/unfollow';

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
      .post(this.apiURL, data)
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
