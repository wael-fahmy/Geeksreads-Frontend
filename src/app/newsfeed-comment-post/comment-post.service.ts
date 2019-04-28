import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './comment-post.model';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CommentServices {

  /**
   * Creates an instance of CommentServices.
   * with an instance of httpclient and router to navigate through pages
   * @param {HttpClient} http
   * @memberof CommentServices
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * creates and an object from the interface of comment-post class module.
   * @private
   * @type {Post}
   * @memberof CommentServices
   */
  private Comment: Post;


  get_comment_post() {
    if (localStorage.getItem('userId') === null) {
      this.router.navigate(['/sign-in']);
      return;
    }
    this.http.get('https://geeksreads.herokuapp.com/api/user_status/show', {
      params:
      {

      }
    }).subscribe(
      (serverResponse: any) => {
        console.log(serverResponse);
        this.Comment.userimage = serverResponse[0].MakerPhoto;
        this.Comment.username = serverResponse[0].MakerName;
        this.Comment.activityDate = serverResponse[0].ReviewDate;
        this.Comment.comment = serverResponse[0].ReviewBody;
      }, (error: { json: () => void; }) => {
        console.log(error);
      }
    );
  }

  get_updated_comment_post() {
    return this.get_updated_comment_post().asObservable();
  }
}
