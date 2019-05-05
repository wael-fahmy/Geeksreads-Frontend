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

  commentMakerImage;
  comment;
  reviewerName;
  reviewerImage;
  reviewDate;
  reviewBody;
  ///////////////////////////////// end of HTML VARIABLES ////////////////////////////////////////////////

  /////////////////////////////////// Methods ///////////////////////////////////////////////////







  //////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Creates an instance of NewsfeedPostComponent.
   *  @param {PostsServices} PostsServicesObj
   *  @memberof NewsfeedPostComponent
   */
  constructor(public PostsServicesObj: PostsServices, private router: Router) { }


  /**
   * The  functions created in the service are implemented here
   *
   * @memberof NewsfeedPostComponent
   */
  ngOnInit() {
    //  if (localStorage.getItem('token') === null) {
    //    this.router.navigate(['/homepage']);
    //  }
    this.PostsServicesObj.getpost();
    this.newsfeedSubscription = this.PostsServicesObj.get_post_updated().subscribe((PostInfo) => {
      this.PostObj = PostInfo;
      // console.log(this.PostObj);
      // this.setData();
      // The following is to check if there any posts received or not
      // if their count=0 then a message to be displayed
      // this.recerivedPostsCount = this.PostObj.length;
      // if ( this.recerivedPostsCount === 0 ) {
      //   this.fiStatuses = false;
      // }
    });
  }

  // setData() {
  //   this.commentMakerName = this.PostObj[0].CommentMakerName;
  //   this.commentDate = this.PostObj[0].CommentDate;
  //   this.commentMakerImage = this.PostObj[0].CommentMakerPhoto;
  //   this.comment = this.PostObj[0].CommentBody;
  //   this.StatusType = this.PostObj[0].StatusType;
  //   this.bookimage = this.PostObj[0].BookPhoto;
  //   this.bookname = this.PostObj[0].BookName;
  //   this.reviewerName = this.PostObj[0].ReviewMakerName;
  //   this.reviewerImage = this.PostObj[0].ReviewMakerPhoto;
  //   this.reviewDate = this.PostObj[0].ReviewDate;
  //   this.reviewBody = this.PostObj[0].ReviewBody;
  // }
}
