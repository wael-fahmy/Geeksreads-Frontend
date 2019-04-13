import { Injectable } from '@angular/core';
import { Subject } from 'rxjs' ;
import { Post } from './newsfeed-post.model';
import { HttpClient } from '@angular/common/http';

/**
 * contains all the service functions 
 *
 * @export
 * @class PostsServices
 */
@Injectable({ providedIn: 'root' })


export class PostsServices {

/**
 *Creates an instance of PostsServices
 * @param {HttpClient} http
 * @memberof PostsServices
 */
constructor(private http: HttpClient) {}
private Posts: Post[] = [];
private PostsUpdated = new Subject<Post[]>();



/**
 *
 * this functions gets the data required ftom the backend
 * @memberof PostsServices
 */
getposts() {
    this.http.get<{message: string, Post: Post[]}>('http://localhost:3000/api/list')
    .subscribe((PostData) => {
       this.Posts = PostData.Post;
      // this.PostsUpdated.next([...this.Posts]);
      
    } );
}




/**
 * This function makes sure that the newsfeed is updated
 *
 * @returns
 * @memberof PostsServices
 */
get_posts_updated() {
    return this.PostsUpdated.asObservable();
}
}
