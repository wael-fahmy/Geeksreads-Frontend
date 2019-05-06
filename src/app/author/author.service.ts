import { AuthorModel } from './author-model';
import { AuthorBooksModel } from './author-books-model';
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
   *  Model to fill
   *  @private
   *  @type {Author}
   *  @memberof AuthorService
   */
  private author: AuthorModel;

  /**
   * Author Books Model to fill
   * @private
   * @type {AuthorBooksModel}
   * @memberof AuthorService
   */
  private authorBooks: AuthorBooksModel[] = [];

  /**
   *  Subject object
   *  @private
   *  @memberof AuthorService
   */
  private authorUpdated = new Subject<AuthorModel>();

  /**
   * Author Books Service
   * @private
   * @memberof AuthorService
   */
  private authorBooksUpdated = new Subject<AuthorBooksModel[]>();

  /**
   *  Get the JSON response and update the author info
   *  @memberof AuthorService
   */
  getAuthorInfo(snapshotParam: string) {
    this.http
      // .get('http://localhost:3000/api/author', {
      .get('https://geeksreads.herokuapp.com/api/authors/id', {
        params: {
          auth_id: snapshotParam,
        }
      })
      .subscribe((serverResponse: AuthorModel) => {
        this.author = serverResponse;
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
   *  Get the JSON response and get author books
   *  @memberof AuthorService
   */
  getBooksByAuthor(snapshotParam: string) {
    this.http
      // .get('http://localhost:3000/api/books/author', {
      .get('https://geeksreads.herokuapp.com/api/books/author', {
        params: {
          search_param: snapshotParam
        }
      })
      .subscribe((serverResponse: any) => {
        this.authorBooks = serverResponse;
        this.authorBooksUpdated.next([...this.authorBooks]);
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
  getBooksByAuthorUpdated() {
    return this.authorBooksUpdated.asObservable();
  }

  /**
   *  Creates an instance of AuthorService.
   *  @param {HttpClient} http
   *  @memberof AuthorService
   */
  constructor(private http: HttpClient, private router: Router) { }
}
