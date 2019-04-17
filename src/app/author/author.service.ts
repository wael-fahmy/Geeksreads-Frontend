import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorModel } from './author.model';
import { HttpClient } from '@angular/common/http';

/**
 *
 *  Inject
 *  @export
 *  @class AuthorService
 */
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
    // tslint:disable-next-line: deprecation
    // const data = new URLSearchParams();
    // data.append('email', this.userEmail);
    // data.append('pass', this.userPassword);
    this.http
      .post('https://geeksreads.herokuapp.com/api/Author/?auth_name=Deena Craig', '')
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
        this.author.authorId = serverResponse.AuthorId;
        this.author.authorName = serverResponse.AuthorName;
        this.author.authorPicture = serverResponse.Photo;
        this.author.authorBookIds = serverResponse.BookId;
        this.author.authorFollowingUserIds = serverResponse.FollowingUserId;
        this.author.authorNumberOfFollowers = serverResponse.FollowingUserId.length();
        this.authorUpdated.next(this.author);
      }, (error: { json: () => void; }) => {
        console.log(error.json);
      });
    // this.http.get<{ message: string, authorInfo: AuthorModel }>('http://localhost:3000/api/author').
    //   subscribe((serverResponse) => {       // subscribe the recived data
    //     // and put it in the user object to display it
    //     this.author = serverResponse.authorInfo;
    //     this.authorUpdated.next(this.author);
    //   });
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
