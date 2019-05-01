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
  /**
   *  User name
   */
  userName = 'Yara Mohamed ';

  activityLog ;
  /**
   *  User name
   */
  activityDate ;

  /**
   *  User name
   */
  comment = 'That book is really great';

  /**
   *  Creates an instance of NewsfeedCommentPostComponent.
   *  @memberof NewsfeedCommentPostComponent
   */
  constructor(public PostsServices : PostsServices) { }

  /**
   *  Angular Init
   * @memberof NewsfeedCommentPostComponent
   */
  ngOnInit() {
    this.PostsServices.getpost();
    this.Sub = this.PostsServices.get_post_updated().subscribe((Posts: Post[]) => {
    this.postObj = Posts;
    this.userName = this.postObj[0].MakerName;
    this.activityDate = this.postObj[0].CommentDate;
    this.comment = this.postObj[0].CommentBody;
    });
  }

  /**
   * Function that prevent memory leaks when the component is discarded
   * @memberof NewsfeedCommentPostComponent
   */
  // ngOnDestroy() {
  //   this.Sub.unsubscribe();
  // }
}
