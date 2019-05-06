import { Component, OnInit, Renderer2 } from '@angular/core';
import { Bookreviews } from './book-comment-user.model';
import { Subscription } from 'rxjs';
import { Bookreviews_Service } from './book-comment-user.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-comment-user',
  templateUrl: './book-comment-user.component.html',
  styleUrls: ['./book-comment-user.component.css']
})
export class BookCommentUserComponent implements OnInit {

private Sub_profile: Subscription;
//////////////////////////////////////////////
reviewerid: string [] = [];
reviewername: string [] = [];
reviewerimage: string [] = [];
reviewerdate: string [] = [];
reviewerbody: string [] = [];
reviewerrate: string [] = [];
reviewerlikes: string [] = [];
reviewercomments: string [] = [];
userid: string [] = [];
visible = false;
////////////////////////////////////////////////
public review_information: Bookreviews[] = [];
public befor_dots: string [] = [];
public after_dots: string [] = [];
public load_more_reviews = 0;
constructor(public bookreviews_service: Bookreviews_Service, render: Renderer2) { }

ngOnInit() {
    this.bookreviews_service.get_review_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.bookreviews_service.get_review_Info_updated()
// tslint:disable-next-line: variable-name
    .subscribe((review_Information: Bookreviews[]) => {
      this.review_information = review_Information;
      console.log(this.review_information);
    });
  }
  ShowReviews() {
    const review = document.getElementById('review');
    const Rbutton = document.getElementById('show-reviews');
    if (this.visible === false) {
      review.style.display = 'block';
      Rbutton.innerHTML = 'Hide Commuinty Reviews';
      this.visible = true;
    } else {
      review.style.display = 'none';
      Rbutton.innerHTML = 'Show Commuinty Reviews';
      this.visible = false;
    }
  }
}
