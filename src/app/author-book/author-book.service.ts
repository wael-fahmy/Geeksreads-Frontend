import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorBookModel } from './author-book.model';
import { HttpClient } from '@angular/common/http';

/**
 *  Author Book Injectable
 *  @export
 *  @class AuthorBookService
 */
@Injectable({
  providedIn: 'root'
})
export class AuthorBookService {

  /**
   *  Creates an instance of AuthorBookService.
   *  @param {HttpClient} http
   *  @memberof AuthorBookService
   */
  constructor(private http: HttpClient) { }

  /**
   * Object to fill
   * @private
   * @type {AuthorBookModel}
   * @memberof AuthorBookService
   */
  private authorBook: AuthorBookModel;

  /**
   * Subject object
   * @private
   * @memberof AuthorBookService
   */
  private authorBookUpdated = new Subject<AuthorBookModel>();

  /**
   * To update the book's info as observed
   * @returns
   * @memberof AuthorBookService
   */
  getAuthorBookInfoUpdated() {
    return this.authorBookUpdated.asObservable();
  }
}
