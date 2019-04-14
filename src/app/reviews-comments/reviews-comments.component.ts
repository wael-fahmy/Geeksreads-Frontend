import { Component, OnInit } from '@angular/core';
import { CommentsDetails } from './reviews-comments.model';
import { Subscription } from 'rxjs';
import { CommentsDetails_Service } from './reviews-comments.service';
import { delay } from 'q';
@Component({
  selector: 'app-reviews-comments',
  templateUrl: './reviews-comments.component.html',
  styleUrls: ['./reviews-comments.component.css']
})
export class ReviewsCommentsComponent implements OnInit {

// tslint:disable-next-line: variable-name
/**
 *
 * variable used to carry subscription
 * @private
 * @type {Subscription}
 * @memberof ReviewsCommentsComponent
 */
private Sub_profile: Subscription;
// tslint:disable-next-line: variable-name
/**
 *
 * variable list used to carry comments list
 * @type {CommentsDetails[]}
 * @memberof ReviewsCommentsComponent
 */
public comment_details: CommentsDetails[] = [];
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of ReviewsCommentsComponent.
   * @param {CommentsDetails_Service} comments_service
   * @memberof ReviewsCommentsComponent
   */
  constructor(public comments_service: CommentsDetails_Service) { }
  /**
   *
   * function used to intilize page and set elements
   * @memberof ReviewsCommentsComponent
   */
  ngOnInit() {
    this.comments_service.get_comments_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.comments_service.get_comments_Info_updated().subscribe((comments_Information: CommentsDetails[]) => {
      this.comment_details = comments_Information;
      console.log(this.comment_details[0].user_name);
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }

}
