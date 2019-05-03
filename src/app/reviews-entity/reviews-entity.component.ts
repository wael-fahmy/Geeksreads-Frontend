import { Component, OnInit, Input } from '@angular/core';
import { ReviewDetails } from './reviews-entity.model';
import { Subscription } from 'rxjs';
import { BookDetails } from '../book-entity/book-entity.model';
import { AuthorDetails } from '../book-entity/book-entity.model';
import { ReviewerDetails_Service } from './reviews-entity.service';
import { delay } from 'q';
@Component({
  selector: 'app-reviews-entity',
  templateUrl: './reviews-entity.component.html',
  styleUrls: ['./reviews-entity.component.css']
})
export class ReviewsEntityComponent implements OnInit {
  @Input() ReviewIDCompare;
  type1: string;
  type2: string;
  booktitle: string [] = [];
  bookimage: string [] = [];
  bookreaddate: string [] = [];
  bookauthorid: string [] = [];
  /////////////////////////////////////
  reviewerid: string[] = [];
  reviewerrate: any [] = [];
  reviewerdate: any [] = [];
  reviewerbody: string [] = [];
  bookId: string [] = [];
  userId: string [] = [];
  reviewername: string [] = [];
  reviewerlikes: any [] = [];
  reviewerimage: string [] = [];
  reviewercomments: string [] = [];
  //////////////////////////////////////
  bookauthor: string [] = [];
  /////////////////////////////////////
  private Sub_profile: Subscription;
  public review_details: ReviewDetails[] = [];
  public book_details: BookDetails[] = [];
  public author_details: AuthorDetails[] = [];
  //////////////////////////////////////
  public befor_dots: string [] = [];
  public after_dots: string [] = [];
constructor(public review_service: ReviewerDetails_Service) { }
ngOnInit() {
    console.log(this.ReviewIDCompare);
    const BookID = '5c9114a0d345b4a65637eacc';
    const UserID = '5cc5df8c2e9c5800172864c9';
    this.review_service.get_Review_Info(BookID, UserID);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.review_service.get_review_Info_updated().subscribe((review_Information: ReviewDetails[]) => {
      this.review_details = review_Information;
      this.SetElements();
    });
    this.review_service.get_book_Info(BookID);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.review_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      this.SetInfoBook();
    });
    this.type1 = 'Currently Reading';
    this.type2 = 'Read';
    const author = localStorage.getItem('authorID');
    this.review_service.get_author_Info(author);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.review_service.get_author_Info_updated().subscribe((author_Information: AuthorDetails[]) => {
      this.author_details = author_Information;
      this.bookauthor[0] = this.author_details[0].AuthorName;
    });
  }
  SetElements() {
    /*
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.review_details.length; x++) {
      this.bookreaddate[x] = this.review_details[x].reviewDate;
      this.bookId[x] = this.review_details[x].bookId;
      this.reviewerid[x] = this.review_details[x].reviewId;
      this.reviewerrate[x] = this.review_details[x].rating;
      this.reviewername[x] = this.review_details[x].userName;
      this.reviewerbody[x] = this.review_details[x].reviewBody;
      this.reviewerlikes[x] = this.review_details[x].LikesCount;
      this.reviewerdate[x] = this.review_details[x].reviewDate;
    }
    */
    this.bookreaddate[0] = '';
    this.bookId[0] = '';
    this.reviewerid[0] = '';
    this.reviewerrate[0] = '';
    this.reviewername[0] = '';
    this.reviewerbody[0] = '';
    this.reviewerlikes[0] = '';
    this.reviewerdate[0] = '';
  }
  SetInfoBook() {
    this.bookimage[0] = this.book_details[0].Cover;
    this.booktitle[0] = this.book_details[0].Title;
    this.bookauthorid[0] = this.book_details[0].AuthorId;
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
  OnclickLike(index: ReviewDetails) {
    const Liked = document.getElementById('liked');
    const liking = document.getElementById('show-likes');
    if(Liked.innerHTML === 'Like') {
      Liked.innerHTML = 'Liked';
      let x = liking.innerHTML.toString();
// tslint:disable-next-line: radix
      let y = parseInt(x);
      y = y + 1;
      x = y.toString();
      liking.innerHTML = x;
    } else {
      Liked.innerHTML = 'Like';
      let x = liking.innerHTML.toString();
// tslint:disable-next-line: radix
      let y = parseInt(x);
      y = y - 1;
      x = y.toString();
      liking.innerHTML = x;
    }
    //this.review_service.request_reviewer_like(index.reviewer_id, liking.innerHTML.toString());
  }
  SplitString() {
  }
  book_status(index: string) {
    const first = document.getElementById(index);
    const second = document.getElementById('first-option');
    const x = first.innerHTML.toString();
    first.innerHTML = second.innerHTML.toString();
    second.innerHTML = x;
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
}
