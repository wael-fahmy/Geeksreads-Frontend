import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../newsfeed/newsfeed-main.model';
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
   * Number of Stars
   * @type {*}
   * @memberof NewsfeedPostComponent
   */
  @Input() NumberOfStars: any;

  /**
   * Activity Date
   * @type {string}
   * @memberof NewsfeedPostComponent
   */
  @Input() activityDate: string;

  /**
   * Author ID
   * @type {string}
   * @memberof NewsfeedPostComponent
   */
  @Input() authorId: string;

  /**
   * Author Name
   * @type {*}
   * @memberof NewsfeedPostComponent
   */
  @Input() authorname: any;

  /**
   * Book ID
   * @type {string}
   * @memberof NewsfeedPostComponent
   */
  @Input() bookId: string;

  /**
   * Book Image
   * @type {*}
   * @memberof NewsfeedPostComponent
   */
  @Input() bookimage: any;

  /**
   * Book Name
   * @type {*}
   * @memberof NewsfeedPostComponent
   */
  @Input() bookname: any;

  /**
   * Book Status
   * @type {*}
   * @memberof NewsfeedPostComponent
   */
  @Input() bookstatus: any;

  /**
   * Maker Image
   * @type {string}
   * @memberof NewsfeedPostComponent
   */
  @Input() makerImage: string;

  /**
   * Review
   * @type {string}
   * @memberof NewsfeedPostComponent
   */
  @Input() review: string;

  /**
   * Review
   * @type {string}
   * @memberof NewsfeedPostComponent
   */
  @Input() userId: string;

  /**
   * User Name
   * @type {string}
   * @memberof NewsfeedPostComponent
   */
  @Input() userName: string;

  /**
   * Creates an instance of NewsfeedPostComponent.
   * @memberof NewsfeedPostComponent
   */
  constructor() { }

  /**
   * Angular Init
   * @memberof NewsfeedPostComponent
   */
  ngOnInit() { }
}
