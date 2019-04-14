import { Component, OnInit } from '@angular/core';
import { ReviewDetails } from './reviews-entity.model';
import { Subscription } from 'rxjs';
import { ReviewerDetails_Service } from './reviews-entity.service';
import { delay } from 'q';
@Component({
  selector: 'app-reviews-entity',
  templateUrl: './reviews-entity.component.html',
  styleUrls: ['./reviews-entity.component.css']
})
export class ReviewsEntityComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  /**
   *
   * variable used to carry Subscription
   * @private
   * @type {Subscription}
   * @memberof ReviewsEntityComponent
   */
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  /**
   *
   * variable used to carry review_details
   * @type {ReviewDetails[]}
   * @memberof ReviewsEntityComponent
   */
  public review_details: ReviewDetails[] = [];
  // tslint:disable-next-line: variable-name
  /**
   *
   * variable used to carry half of review body
   * @type {string []}
   * @memberof ReviewsEntityComponent
   */
  public befor_dots: string [] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * variable used to carry half of review body
 * @type {string []}
 * @memberof ReviewsEntityComponent
 */
public after_dots: string [] = [];
// tslint:disable-next-line: variable-name
/**
 * Creates an instance of ReviewsEntityComponent.
 * @param {ReviewerDetails_Service} review_service
 * @memberof ReviewsEntityComponent
 */
constructor(public review_service: ReviewerDetails_Service) { }
/**
 *
 * function used to intilize page and set list of reviews
 * @memberof ReviewsEntityComponent
 */
ngOnInit() {
    this.review_service.get_Review_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.review_service.get_review_Info_updated().subscribe((review_Information: ReviewDetails[]) => {
      this.review_details = review_Information;
      this.SplitString();
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  /**
   *
   * function used to expand the review body
   * @memberof ReviewsEntityComponent
   */
  more_review_discription() {
    const dots = document.getElementById('dots-user-review');
    const moreText = document.getElementById('more-review');
    const btnText = document.getElementById('myBtn-user-review');
    if (dots.style.display === 'none') {
      dots.style.display = 'inline';
      btnText.innerHTML = 'Read Full Review';
      moreText.style.display = 'none';
    } else {
      dots.style.display = 'none';
      btnText.innerHTML = 'Show Less Review';
      moreText.style.display = 'inline';
    }
  }
  /**
   *
   * function used to split review body
   * @memberof ReviewsEntityComponent
   */
  SplitString() {
// tslint:disable-next-line: variable-name
    let starting_indext = 0;
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.review_details.length; i ++) {
// tslint:disable-next-line: prefer-const
      let word = this.review_details[i].reviewer_body.split(',');
      this.befor_dots[starting_indext] = word[0];
      this.after_dots[starting_indext] = word[1];
      starting_indext++;
    }
  }
}
