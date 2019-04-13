import { Component, OnInit } from '@angular/core';
import { Post } from './newsfeed-post.model';
import { PostsServices } from './newsfeed-post.service';
import { Subscription } from 'rxjs';

/**
 *
 *
 * @export
 * @class NewsfeedPostComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-newsfeed-post',
  templateUrl: './newsfeed-post.component.html',
  styleUrls: ['./newsfeed-post.component.css']
})

export class NewsfeedPostComponent implements OnInit {

  /**
   *
   * instant of posts array
   * @type {Post[]}
   * @memberof NewsfeedPostComponent
   */
  public Posts: Post[] = [];

  /**
   *
   * this is the constructor of the component class, it makes an instance of the posts service class
   * @private
   * @type {Subscription}
   * @memberof NewsfeedPostComponent
   */
  private subprofile: Subscription; // hal this is to use function subscribe ??


  /**
   *Creates an instance of NewsfeedPostComponent.
   * @param {PostsServices} PostsServicesObj
   * @memberof NewsfeedPostComponent
   */
  constructor( public PostsServicesObj: PostsServices) { }
    

  /**
   * The  functions created in the service are implemented here 
   *
   * @memberof NewsfeedPostComponent
   */
  ngOnInit() {
    this.PostsServicesObj.getposts();
   this.subprofile = this.PostsServicesObj.get_posts_updated().subscribe( (PostsInfo: Post[]) => {
    this.Posts = PostsInfo; });
    //console.log(this.Posts[0].username);
   
   }
  }
