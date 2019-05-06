import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bookreviews_Service } from '../book-comment-user/book-comment-user.service';
import { Book_Service } from '../book/book.service';
import { Book } from '../book/book.model';
import { Bookreviews } from '../book-comment-user/book-comment-user.model';
@Component({
  selector: 'app-reviews-entity',
  templateUrl: './reviews-entity.component.html',
  styleUrls: ['./reviews-entity.component.css']
})
export class ReviewsEntityComponent implements OnInit {
  @Input() ReviewID: string;
  @Input() BookID: string;
  ////////////////////////////////////////////////////
// review
reviewerimage: string;
reviewername: string;
reviewrate: string;
reviewdate: string;
reviewerid: string;
reviewerbody: string;
reviewerlike: string;
reviewercomm: string;
befor_dots: string [] = [];
after_dots: string [] = [];
//////////////////////////////////////////////////
// book
booktitle: string;
bookcover: string;
bookauthor: string;
bookid: string;
authorid: string;
bookstatus: string;
type1: string;
type2: string;
//////////////////////////////////////////////////
private Sub_profile: Subscription;
public book_details: Book [] = [];
public review_details: Bookreviews [] = [];
//////////////////////////////////////////////////////////////////
constructor(public review_service: Bookreviews_Service,
            public book_service: Book_Service) { }
ngOnInit() {
    console.log(this.ReviewID);
    // tslint:disable-next-line: max-line-length
    this.review_service.get_review_Info(this.BookID);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.review_service.get_review_Info_updated().subscribe((review_Information: Bookreviews[]) => {
      this.review_details = review_Information;
      this.SetReview();
    });
// tslint:disable-next-line: max-line-length
    this.book_service.get_book_Info(this.BookID);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.book_service.get_book_Info_updated().subscribe((book_Information: Book[]) => {
      this.book_details = book_Information;
      this.SetBook();
    });
  }
  SetBook() {
    this.bookcover = this.book_details[0].Cover;
    this.booktitle = this.book_details[0].Title;
    this.bookauthor = this.book_details[0].AuthorName;
    this.authorid = this.book_details[0].AuthorId;
    this.bookid = this.book_details[0].BookId;
    this.bookstatus = this.book_details[0].ReadStatus;
    this.assign_status(this.bookstatus);
  }
  assign_status(index: string) {
    if (index === 'Want To Read') {
      this.type1 = 'Currently Reading';
      this.type2 = 'Read';
    } else if (index === 'Read') {
      this.type1 = 'Currently Reading';
      this.type2 = 'Want To Read';
    } else if (index === 'Currently Reading') {
      this.type1 = 'Read';
      this.type2 = 'Want To Read';
    }
  }
  SetReview() {
// tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.review_details.length ; i++) {
      if (this.review_details[i].reviewId === this.ReviewID) {
        this.reviewerimage = this.review_details[i].photo;
        this.reviewername = this.review_details[i].userName;
        this.reviewerid = this.review_details[i].userId;
        this.reviewdate = this.review_details[i].reviewDate;
        this.SetDate(this.reviewdate);
        this.reviewrate = this.review_details[i].rating.toString();
        this.SetRate(this.reviewrate);
        this.reviewerbody = this.review_details[i].reviewBody;
        this.SplitString(this.reviewerbody);
        this.reviewerlike = this.review_details[i].likesCount;
        this.reviewercomm = this.review_details[i].commCount;
      }
    }
  }
  SetDate(date: string) {
    const word =  date.split('T');
    this.reviewdate = word[0];
  }
  SplitString(body: string) {
    const ReadMoreBt = document.getElementById('myBtn-user-review');
    const ReadMoreDot = document.getElementById('dots-user-review');
    const check = body.split(' ');
    if (check.length < 15) {
      ReadMoreBt.style.display = 'none';
      ReadMoreDot.style.display = 'none';
      this.befor_dots[0] = body;
      this.after_dots[0] = '';
    } else {
      const word = body.split(',');
      this.befor_dots[0] = word[0];
      this.after_dots[0] = word[1];
    }
}
SetRate(rate: string) {
  const rate0 = document.getElementById('star0');
  const rate1 = document.getElementById('star1');
  const rate2 = document.getElementById('star2');
  const rate3 = document.getElementById('star3');
  const rate4 = document.getElementById('star4');
  if (rate === '1') {
    rate0.style.color = 'orange';
  } else if (rate === '2') {
    rate0.style.color = 'orange';
    rate1.style.color = 'orange';
  } else if (rate === '3') {
    rate0.style.color = 'orange';
    rate1.style.color = 'orange';
    rate2.style.color = 'orange';
  } else if (rate === '4') {
    rate0.style.color = 'orange';
    rate1.style.color = 'orange';
    rate2.style.color = 'orange';
    rate3.style.color = 'orange';
  } else if (rate === '5') {
    rate0.style.color = 'orange';
    rate1.style.color = 'orange';
    rate2.style.color = 'orange';
    rate3.style.color = 'orange';
    rate4.style.color = 'orange';
  }
}
}
