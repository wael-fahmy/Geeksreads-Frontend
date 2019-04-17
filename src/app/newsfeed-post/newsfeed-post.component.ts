import { Component, OnInit } from '@angular/core';
import { Post } from './newsfeed-post.model';
import { PostsServices } from './newsfeed-post.service';
import { Subscription } from 'rxjs';

/**
 *  Newsfeed post component
 *  @export
 *  @class NewsfeedPostComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-newsfeed-post',
  templateUrl: './newsfeed-post.component.html',
  styleUrls: ['./newsfeed-post.component.css']
})

export class NewsfeedPostComponent implements OnInit {


  /**
   *  This is the constructor of the component class, it makes an instance of the posts service class
   *  @private
   *  @type {Subscription}
   *  @memberof NewsfeedPostComponent
   */
  private subprofile: Subscription;

  /**
   *
   * Post object to fill data
   * @type {Post}
   * @memberof NewsfeedPostComponent
   */
  PostObj: Post;

  /**
   *
   * User name
   * @memberof NewsfeedPostComponent
   */
  username = 'Yara';

  /**
   *
   * Activity date
   * @memberof NewsfeedPostComponent
   */
  activitydate = 'about 2 hours ago';

  /**
   *
   * Book name
   * @memberof NewsfeedPostComponent
   */
  bookname = 'Eat Pray Love';

  /**
   *
   * Author Name
   * @memberof NewsfeedPostComponent
   */
  authorname = 'Paulo';

  /**
   *
   * Review
   * @memberof NewsfeedPostComponent
   */
  review = 'It was really nice';

  /**
   *
   * Activity
   * @memberof NewsfeedPostComponent
   */
  activity = 'rated a book';

  /**
   *
   * Book Image
   * @memberof NewsfeedPostComponent
   */
  bookimage = 'https://via.placeholder.com/120x120';

  /**
   *  Creates an instance of NewsfeedPostComponent.
   *  @param {PostsServices} PostsServicesObj
   *  @memberof NewsfeedPostComponent
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
  }
}
