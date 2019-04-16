import { Component, OnInit } from '@angular/core';

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

  /**
   *  User name
   */
  userName: string;

  /**
   *  User name
   */
  activityDate: string;

  /**
   *  User name
   */
  comment: string;

  /**
   *  Creates an instance of NewsfeedCommentPostComponent.
   *  @memberof NewsfeedCommentPostComponent
   */
  constructor() { }

  /**
   *  Angular Init
   * @memberof NewsfeedCommentPostComponent
   */
  ngOnInit() {
  }
}
