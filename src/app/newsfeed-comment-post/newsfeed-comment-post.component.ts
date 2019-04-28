import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentServices } from './comment-post.service';
import { Subscription } from 'rxjs';
import { Post } from './comment-post.model';
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

export class NewsfeedCommentPostComponent implements OnInit , OnDestroy {


  /**
   *
   * created post obj of type comment-post module
   * @type {Post}
   * @memberof NewsfeedCommentPostComponent
   */
  postObj: Post;
  /**
   * created an instance subscription to save memory leakage when the component is discarded
   * @private
   * @type {Subscription}
   * @memberof NewsfeedCommentPostComponent
   */
  private Sub: Subscription ;
  /**
   *  User name
   */
  userName = 'Yara Mohamed ';

  activityLog = 'commented on a post';
  /**
   *  User name
   */
  activityDate = 'about 2 hours ago';

  /**
   *  User name
   */
  comment = 'That book is really great';

  /**
   *  Creates an instance of NewsfeedCommentPostComponent.
   *  @memberof NewsfeedCommentPostComponent
   */
  constructor(public commentServices: CommentServices) { }

  /**
   *  Angular Init
   * @memberof NewsfeedCommentPostComponent
   */
  ngOnInit() {
    this.commentServices.get_comment_post();
    this.Sub = this.commentServices.get_updated_comment_post().subscribe((Posts: Post) => {
    this.postObj = Posts;
    this.userName = this.postObj.username;
    this.activityDate = this.postObj.activityDate;
    this.comment = this.postObj.comment;
    });
  }

  /**
   * Function that prevent memory leaks when the component is discarded
   * @memberof NewsfeedCommentPostComponent
   */
  ngOnDestroy() {
    this.Sub.unsubscribe();
  }
}
