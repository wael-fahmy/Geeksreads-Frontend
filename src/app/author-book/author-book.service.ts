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
   *  Get book info
   *  @memberof AuthorBookService
   */
  getAuthorBookInfo() {
    this.http.get<{ message: string, authorBookInfo: AuthorBookModel }>('http://localhost:3000/api/author-book').
      subscribe((AuthorBookData) => {
        this.authorBook = AuthorBookData.authorBookInfo;
        this.authorBookUpdated.next(this.authorBook);
      });
  }


  /**
   * To update the book's info as observed
   * @returns
   * @memberof AuthorBookService
   */
  getAuthorBookInfoUpdated() {
    return this.authorBookUpdated.asObservable();
  }
}
