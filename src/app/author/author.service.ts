import { AuthorModel } from './author-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
      .get('https://geeksreads.herokuapp.com/api/authors/name', {
        params: {
          auth_name: 'Deena Craig',
        }
      })
      .subscribe((serverResponse: AuthorModel) => {
        console.log(serverResponse);
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
