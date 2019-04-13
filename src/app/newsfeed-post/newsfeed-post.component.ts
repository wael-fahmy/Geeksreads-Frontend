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
   * this is the constructor of the component class, it makes an instance of the posts service class
   * @private
   * @type {Subscription}
   * @memberof NewsfeedPostComponent
   */
  private subprofile: Subscription;
  PostObj: Post;
  username: string = "Yara";
  activitydate: string = "about 2 hours ago ";
  bookname: string = "Eat Pray Love";
  authorname: string = "Paulo";
  review: string = "It was really nice";
  activity: string = "rated a book";
  bookimage: string = "https://via.placeholder.com/120x120";

  /**
   *Creates an instance of NewsfeedPostComponent.
   * @param {PostsServices} PostsServicesObj
   * @memberof NewsfeedPostComponent
   */
  constructor(public PostsServicesObj: PostsServices) { }


  /**
   * The  functions created in the service are implemented here 
   *
   * @memberof NewsfeedPostComponent
   */
  ngOnInit() {
    this.PostsServicesObj.getpost();
    this.subprofile = this.PostsServicesObj.get_post_updated().subscribe((PostInfo: Post) => {
      this.PostObj = PostInfo;
      this.activity = this.PostObj.activitylog;
      this.activitydate = this.PostObj.activitydate;
      this.authorname = this.PostObj.authorname;
      this.bookimage = this.PostObj.bookimage;
      this.bookname = this.PostObj.bookname;
      this.review = this.PostObj.review;
      this.username = this.PostObj.username;
      
    });
    //console.log(this.Posts[0].username);

  }
}
