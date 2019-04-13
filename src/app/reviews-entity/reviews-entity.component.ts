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
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  public review_details: ReviewDetails[] = [];
  // tslint:disable-next-line: variable-name
  public befor_dots: string [] = [];
// tslint:disable-next-line: variable-name
  public after_dots: string [] = [];
// tslint:disable-next-line: variable-name
  constructor(public review_service: ReviewerDetails_Service) { }

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
  SplitString() {
    let starting_indext = 0;
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.review_details.length; i ++) {
      let word = this.review_details[i].reviewer_body.split(',');
      this.befor_dots[starting_indext] = word[0];
      this.after_dots[starting_indext] = word[1];
      starting_indext++;
    }
  }
}
