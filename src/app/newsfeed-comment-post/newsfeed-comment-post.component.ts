import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../newsfeed/newsfeed-main.model';
import { PostsServices } from '../newsfeed/newsfeed-main.service';

/**
 *  Newsfeed Comment Component
 *  @export
 *  @class NewsfeedCommentPostComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-newsfeed-comment-post',
  templateUrl: './newsfeed-comment-post.component.html',
  styleUrls: ['./newsfeed-comment-post.component.css']
})

export class NewsfeedCommentPostComponent implements OnInit {

///////////////////////// Subscription and instances from Post Model ///////////////////////////
  /**
   *
   * created post obj of type comment-post module
   * @type {Post}
   * @memberof NewsfeedCommentPostComponent
   */
  postObj: Post[];
  /**
   * created an instance subscription to save memory leakage when the component is discarded
   * @private
   * @type {Subscription}
   * @memberof NewsfeedCommentPostComponent
   */
  private Sub: Subscription ;


  ////////////////////////// HTML variables //////////////////////////////////////////
  /**
   *  User name
   */
  userName = 'Yara Mohamed ';


  /**
   * The type of activity ; comment or a review
   *
   * @memberof NewsfeedCommentPostComponent
   */
  activityLog ;

  /**
   *  The activity date
   */
  activityDate ;

  /**
   *  The comment body
   */
  comment = 'That book is really great';


  /**
   *
   * The image of the user who made the comment ( The person i am folllowing)
   * @memberof NewsfeedCommentPostComponent
   */
  makerImage;

  ///////////////////////////////////////////////////////////////////////////////////////////

   //////////// The constructor and the ngOnInit fn /////////////////////////////////////////////
  /**
   *  Creates an instance of NewsfeedCommentPostComponent.
   *  @memberof NewsfeedCommentPostComponent
   */
  constructor( public commentService: PostsServices ) { }

  /**
   *  Angular Init
   * @memberof NewsfeedCommentPostComponent
   */
  ngOnInit() {
    this.commentService.getpost();
    this.Sub = this.commentService.get_post_updated().subscribe((expectedPostArray: Post[])=>{
      this.postObj = expectedPostArray;
      console.log(this.postObj);
      this.comment = expectedPostArray[0].CommentBody;
      this.activityDate = expectedPostArray[0].CommentDate;
      this.makerImage = expectedPostArray[0].CommentMakerPhoto;
      this.activityLog = expectedPostArray[0].StatusType;
      this.userName = expectedPostArray[0].CommentMakerName; 
    },

      (error: { json: () => void; }) => {
        console.log(error);
      }
    );
  }

  /**
   * Function that prevent memory leaks when the component is discarded
   * @memberof NewsfeedCommentPostComponent
   */
  // ngOnDestroy() {
  //   this.Sub.unsubscribe();
  // }
}
