import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bookreviews_Service } from '../book-comment-user/book-comment-user.service';
import { Book_Service } from '../book/book.service';
import { ReadStatus } from '../book-entity/book-entity.model';
import { BookTitle_Service } from '../book-entity/book-entity.service';
import { Book } from '../book/book.model';
import {ReviewerDetails_Service} from './reviews-entity.service';
import { Bookreviews } from '../book-comment-user/book-comment-user.model';
import { ReviewService } from '../review/review.service';
import { delay } from 'q';
import { MatSnackBar } from '@angular/material';
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
reviewerliked: boolean;
userid: string;
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
type3: string;
//////////////////////////////////////////////////
private Sub_profile: Subscription;
public book_details: Book [] = [];
public review_details: Bookreviews [] = [];
public Read_status: ReadStatus;
//////////////////////////////////////////////////////////////////
constructor(public review_service: Bookreviews_Service,
            public book_service: Book_Service, public reviewPost: ReviewerDetails_Service,
            public booktitle_service: BookTitle_Service, public ReviewServ: ReviewService,
            public snackbar: MatSnackBar) { }
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
    this.booktitle_service.Get_book_status(this.BookID);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_status_Info_updated().subscribe((status_Information: ReadStatus) => {
      this.Read_status = status_Information;
      this.SetReadStatus();
    });
  }
  SetReadStatus() {
    this.bookstatus = this.Read_status.ReturnMsg;
    if (this.bookstatus === 'This BookId is Not in any Shelf, Please Add it to Shelf First') {
      this.bookstatus = 'Add To Shelf';
      this.assign_status(this.bookstatus);
    } else {
      this.assign_status(this.bookstatus);
    }
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
      this.type2 = 'Remove From Shelve';
      this.type3 = '';
    } else if (index === 'Read') {
      this.type1 = 'Remove From Shelve';
      this.type2 = '';
      this.type3 = '';
    } else if (index === 'Currently Reading') {
      this.type1 = 'Read';
      this.type2 = 'Remove From Shelve';
      this.type3 = '';
    } else if (index === 'Add To Shelf') {
      this.type1 = 'Want To Read';
      this.type2 = 'Currently Reading';
      this.type3 = 'Read';
    }
  }
  book_status_Post(indexfirst: string, indexsecond: string) {
    const first = document.getElementById(indexfirst);
    const second = document.getElementById(indexsecond);
    const y = first.textContent;
    const x = second.textContent;
    if (y === 'Read') {
      this.booktitle_service.Remove_Book(this.bookid);
      first.textContent = 'Add To Shelf';
      const snackbaref = this.snackbar.open('Book Has Been Removed', ' ' , {
        horizontalPosition: 'end'
      });
      delay(2000);
      this.assign_status(first.textContent);
    } else if (y === 'Want To Read') {
      if (x === 'Remove From Shelve') {
        this.booktitle_service.Remove_Book(this.bookid);
        first.textContent = 'Add To Shelf';
        const snackbaref = this.snackbar.open('Book Has Been Removed', ' ' , {
          horizontalPosition: 'end'
        });
        delay(2000);
        this.assign_status(first.textContent);
      } else {
        this.booktitle_service.add_book_to_shelf_reading(this.bookid);
        first.textContent = x;
        const snackbaref = this.snackbar.open('Book Has Been Added To Currently Reading', ' ' , {
          horizontalPosition: 'end'
        });
        delay(2000);
        this.assign_status(x);
      }
    } else if (y === 'Currently Reading') {
      if (x === 'Remove From Shelve') {
        this.booktitle_service.Remove_Book(this.bookid);
        first.textContent = 'Add To Shelf';
        const snackbaref = this.snackbar.open('Book Has Been Removed', ' ' , {
          horizontalPosition: 'end'
        });
        delay(2000);
        this.assign_status(first.textContent);
      } else {
        this.booktitle_service.add_book_to_shelf_read(this.bookid);
        first.textContent = x;
        const snackbaref = this.snackbar.open('Book Has Been Added to Read', ' ' , {
          horizontalPosition: 'end'
        });
        delay(2000);
        this.assign_status(x);
      }
    } else if (y === 'Add To Shelf') {
      this.booktitle_service.AddToShelf(this.bookid, x);
      first.textContent = x;
      const snackbaref = this.snackbar.open('Book Has Been Added', ' ' , {
        horizontalPosition: 'end'
      });
      delay(2000);
      this.assign_status(x);
    }
    console.log('missed');
  }
  SetReview() {
// tslint:disable-next-line: prefer-for-of
    for (let i = 0 ; i < this.review_details.length ; i++) {
      if (this.review_details[i].reviewId === this.ReviewID) {
        this.reviewerimage = this.review_details[i].photo;
        this.reviewername = this.review_details[i].userName;
        this.reviewdate = this.review_details[i].reviewDate;
        this.SetDate(this.reviewdate);
        this.reviewrate = this.review_details[i].rating.toString();
        this.SetRate(this.reviewrate);
        this.reviewerbody = this.review_details[i].reviewBody;
        this.SplitString(this.reviewerbody);
        this.reviewerlike = this.review_details[i].likesCount;
        this.reviewercomm = this.review_details[i].commCount;
        this.userid = this.review_details[i].userId;
        this.reviewerliked = this.review_details[i].liked;
        this.LikeStatus(this.reviewerliked);
      }
    }
  }
  LikeStatus(liked: boolean) {
    const like = document.getElementById('liked');
    if (liked === true) {
      like.textContent = 'Unlike';
    } else if (liked === false) {
      like.textContent = 'Like';
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
LikePost() {
  console.log(this.ReviewID);
  if (this.reviewerliked === false) {
    this.ReviewServ.post_Like_Review(this.ReviewID);
    const snackbaref = this.snackbar.open('Review Liked: Refresh', ' ' , {
      horizontalPosition: 'end'
    });
    delay(2000);
  } else if (this.reviewerliked === true) {
    this.ReviewServ.post_UnLike_Review(this.ReviewID);
    const snackbaref = this.snackbar.open('Review UnLiked: Refresh', ' ' , {
      horizontalPosition: 'end'
    });
    delay(2000);
  }
}
}
