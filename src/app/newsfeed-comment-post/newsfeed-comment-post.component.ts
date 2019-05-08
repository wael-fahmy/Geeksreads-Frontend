import { Component, OnInit, OnDestroy, Input } from '@angular/core';

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
  ///////////////////////// Subscription and instances from Post Model and at inputs ///////////////////////////

  /**
   * User Name
   * @type {string}
   * @memberof NewsfeedCommentPostComponent
   */
  @Input() userName: string;

  /**
   * Date
   * @type {string}
   * @memberof NewsfeedCommentPostComponent
   */
  @Input() activityDate: string;

  /**
   * Comment
   * @type {string}
   * @memberof NewsfeedCommentPostComponent
   */
  @Input() comment: string;

  /**
   * User Image
   * @type {string}
   * @memberof NewsfeedCommentPostComponent
   */
  @Input() makerImage: string;

  /**
   * Comment ID
   * @type {string}
   * @memberof NewsfeedCommentPostComponent
   */
  @Input() commentId: string;

  /**
   * User ID
   * @type {string}
   * @memberof NewsfeedCommentPostComponent
   */
  @Input() userId: string;

  /**
   * Activity Log
   * @memberof NewsfeedCommentPostComponent
   */
  activityLog = 'commented on a post.';

  //////////// The constructor and the ngOnInit fn /////////////////////////////////////////////
  /**
   *  Creates an instance of NewsfeedCommentPostComponent.
   *  @memberof NewsfeedCommentPostComponent
   */
  constructor() { }

  /**
   * Angular Init
   * @memberof NewsfeedCommentPostComponent
   */
  ngOnInit() { }
}
