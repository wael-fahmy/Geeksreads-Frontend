import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../newsfeed/newsfeed-main.model';
import { PostsServices } from '../newsfeed/newsfeed-main.service';
import { ɵangular_packages_platform_browser_platform_browser_j } from '@angular/platform-browser';

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
  @Input() userName: string;
  @Input() activityDate: string;
  @Input() comment: string;
  @Input() makerImage: string;
  @Input() commentId: string;
  @Input() userId: string;
 // @Input() activityLog: string;

  //////////// The constructor and the ngOnInit fn /////////////////////////////////////////////
  /**
   *  Creates an instance of NewsfeedCommentPostComponent.
   *  @memberof NewsfeedCommentPostComponent
   */
  activityLog = 'commented on a post.'
  constructor() {
    
   }

   
  /**
   * Angular Init
   * @memberof NewsfeedCommentPostComponent
   */
  ngOnInit() {
  

  }
}
