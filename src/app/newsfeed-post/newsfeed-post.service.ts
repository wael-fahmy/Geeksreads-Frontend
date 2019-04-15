import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './newsfeed-post.model';
import { HttpClient } from '@angular/common/http';

/**
 * contains all the service functions
 * @export
 * @class PostsServices
 */
@Injectable({ providedIn: 'root' })


export class PostsServices {

  /**
   * Creates an instance of PostsServices
   * @param {HttpClient} http
   * @memberof PostsServices
   */
  constructor(private http: HttpClient) { }

  /**
   * Post
   * @private
   * @type {Post}
   * @memberof PostsServices
   */
  private post: Post;

  /**
   * Post Updated
   * @private
   * @memberof PostsServices
   */
  private postUpdated = new Subject<Post>();

  /**
   *
   * this functions gets the data required ftom the backend
   * @memberof PostsServices
   */
  getpost() {
    this.http.get<{ message: string, Post: Post }>('http://localhost:3000/api/newsfeed')
      .subscribe((PostData) => {
        this.post = PostData.Post;
        this.postUpdated.next(this.post);

      });
  }

  /**
   * This function makes sure that the newsfeed is updated
   * @returns
   * @memberof PostsServices
   */
  get_post_updated() {
    return this.postUpdated.asObservable();
  }
}
