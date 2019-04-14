import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorModel } from './author.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthorService {


  /**
   *  Creates an instance of AuthorService.
   *  @param {HttpClient} http
   *  @memberof AuthorService
   */
  constructor(private http: HttpClient) { }


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
   *  Get the JSON response from the mock service
   *  and update the author info
   *  @memberof AuthorService
   */
  getAuthorInfo() {
    this.http.get<{ message: string, authorInfo: AuthorModel }>('http://localhost:3000/api/author').
      subscribe((AuthorData) => {       // subscribe the recived data
        // and put it in the user object to display it
        this.author = AuthorData.authorInfo;
        this.authorUpdated.next(this.author);
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
}
