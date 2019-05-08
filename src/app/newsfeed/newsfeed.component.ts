import { Component, OnInit } from '@angular/core';
import { Post } from './newsfeed-main.model';
import { PostsServices } from './newsfeed-main.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { setTNodeAndViewData } from '@angular/core/src/render3/state';

/**
 *  Newsfeed post component
 *  @export
 *  @class NewsfeedPostComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})

export class NewsfeedComponent implements OnInit {

  //////////////////////////  Subscriptions and instances from model classes ////////////////////////////
  /**
   *  This is the constructor of the component class, it makes an instance of the posts service class
   *  @private
   *  @type {Subscription}
   *  @memberof NewsfeedPostComponent
   */
  private newsfeedSubscription: Subscription;

  /**
   *
   * Post object to fill data
   * @type {Post}
   * @memberof NewsfeedPostComponent
   */
  PostObj: Post[] = [];


  //////////////////////////  HTML VARIABLES ////////////////////////////////////////////////////////////
  /**
   *
   * User name
   * @memberof NewsfeedPostComponent
   */
  CommentMakerName;

  /**
   *
   * Activity date
   * @memberof NewsfeedPostComponent
   */
  CommentDate;

  /**
   *
   * Book name
   * @memberof NewsfeedPostComponent
   */
  bookname ;

  /**
   *
   * Author Name
   * @memberof NewsfeedPostComponent
   */
  authorname ;

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
   * The type of the status; comment or review
   *
   * @memberof NewsfeedComponent
   */
  StatusType: string;


  /**
   *
   * a variable that checks if there are posts received or not
   * @type {boolean}
   * @memberof NewsfeedComponent
   */
  fiStatuses: boolean;


  /**
   *
   * variable that contains the number of the posts received
   * @type {number}
   * @memberof NewsfeedComponent
   */
  recerivedPostsCount: number;

  /**
   * Comment Maker Image
   * @memberof NewsfeedComponent
   */
  commentMakerImage;

  /**
   * Comment
   * @memberof NewsfeedComponent
   */
  comment;

  /**
   * Reviewer Name
   * @memberof NewsfeedComponent
   */
  reviewerName;

  /**
   * Reviewer Image
   * @memberof NewsfeedComponent
   */
  reviewerImage;

  /**
   * Review Date
   * @memberof NewsfeedComponent
   */
  reviewDate;

  /**
   * Review Body
   * @memberof NewsfeedComponent
   */
  reviewBody;
  ///////////////////////////////// end of HTML VARIABLES ////////////////////////////////////////////////

  /////////////////////////////////// Methods ///////////////////////////////////////////////////
  /**
   *  Creates an instance of NewsfeedPostComponent.
   *  @param {PostsServices} PostsServicesObj
   *  @memberof NewsfeedPostComponent
   */
  constructor(public PostsServicesObj: PostsServices, private router: Router) {

   }


  /**
   * The  functions created in the service are implemented here
   * @memberof NewsfeedPostComponent
   */
  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/homepage']);
    }
    this.PostsServicesObj.getpost();
    this.newsfeedSubscription = this.PostsServicesObj.get_post_updated().subscribe((PostInfo) => {
      this.PostObj = PostInfo;
    });
  }
}
