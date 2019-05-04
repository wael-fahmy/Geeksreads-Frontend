import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './newsfeed-main.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
  constructor(private http: HttpClient , private router: Router) { }

  /**
   * Post
   * @private
   * @type {Post}
   * @memberof PostsServices
   */
  private post: Post[] = [];

  /**
   * Post Updated
   * @private
   * @memberof PostsServices
   */
  private postUpdated = new Subject<Post[]>();


  /**
   * This functions connects to the backend
   *
   * @memberof PostsServices
   */
  getpost() {
    if (localStorage.getItem('userId') === null) {
      this.router.navigate(['/sign-in']);
      return;
    }
    const data = {
      myuserId: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
    };
    this.http.post('https://geeksreads.herokuapp.com/api/user_status/show' , data)
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
       // this.post[0].BookName = serverResponse.BookName;
        this.post = serverResponse;
        this.postUpdated.next([...this.post]);

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
