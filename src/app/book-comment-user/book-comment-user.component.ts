import { Component, OnInit } from '@angular/core';
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
// tslint:disable-next-line: variable-name
/**
 *
 * vairbale used to take subscription
 * @private
 * @type {Subscription}
 * @memberof BookCommentUserComponent
 */
private Sub_profile: Subscription;
/**
 *
 * variable list used to store reviewers id
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewerid: string [] = [];
/**
 *
 * variable list used to store reviewers name
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewername: string [] = [];
/**
 *
 * variable list used to store reviewers image
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewerimage: string [] = [];
/**
 *
 * variable list used to store reviewers date
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewerdate: string [] = [];
/**
 *
 * variable list used to store reviewers body
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewerbody: string [] = [];
/**
 *
 * variable list used to store reviewers rate
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewerrate: string [] = [];
/**
 *
 * variable list used to store reviewers likes
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewerlikes: string [] = [];
/**
 *
 * variable list used to store reviewers comments
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
reviewercomments: string [] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * variable list used to store reviewers list
 * @type {Bookreviews[]}
 * @memberof BookCommentUserComponent
 */
public review_information: Bookreviews[] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * variable list used to store reviewers half body
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
public befor_dots: string [] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * variable list used to store reviewers half body
 * @type {string []}
 * @memberof BookCommentUserComponent
 */
public after_dots: string [] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * variable used to expande list or not
 * @memberof BookCommentUserComponent
 */
public load_more_reviews = 0;
// tslint:disable-next-line: variable-name
/**
 * Creates an instance of BookCommentUserComponent.
 * @param {Bookreviews_Service} bookreviews_service
 * @memberof BookCommentUserComponent
 */
constructor(public bookreviews_service: Bookreviews_Service) { }
  /**
   *
   * function used to see more reviews by other users
   * @memberof BookCommentUserComponent
   */
  more_user_preview(x: number) {
    let dots: HTMLElement;
    let moreText: HTMLElement;
    let btnText: HTMLElement;
    if (x === 1) {
      dots = document.getElementById('dots-user-review1');
      moreText = document.getElementById('more-review1');
      btnText = document.getElementById('myBtn-user-review1');
    } else if(x === 2) {
      dots = document.getElementById('dots-user-review2');
      moreText = document.getElementById('more-review2');
      btnText = document.getElementById('myBtn-user-review2');
    } else if(x === 3) {
      dots = document.getElementById('dots-user-review3');
      moreText = document.getElementById('more-review3');
      btnText = document.getElementById('myBtn-user-review3');
    } else if(x === 4) {
      dots = document.getElementById('dots-user-review4');
      moreText = document.getElementById('more-review4');
      btnText = document.getElementById('myBtn-user-review4');
    } else if(x === 5) {
      dots = document.getElementById('dots-user-review5');
      moreText = document.getElementById('more-review5');
      btnText = document.getElementById('myBtn-user-review5');
    } else if(x === 6) {
      dots = document.getElementById('dots-user-review6');
      moreText = document.getElementById('more-review6');
      btnText = document.getElementById('myBtn-user-review6');
    }
    if (dots.style.display === 'none') {
      dots.style.display = 'inline';
      btnText.innerHTML = 'Read more';
      moreText.style.display = 'none';
    } else {
      dots.style.display = 'none';
      btnText.innerHTML = 'Read less';
      moreText.style.display = 'inline';
    }
  }
  /**
   *
   * function used to expande the reviews list
   * @memberof BookCommentUserComponent
   */
  load_more_user_preview() {
    const moreText = document.getElementById('more_user_reviews');
    const btnText = document.getElementById('load-more-community-reviews');
    if (this.load_more_reviews === 0) {
      btnText.innerHTML = 'Load Less Community Reviews';
      moreText.style.display = 'inline';
      this.load_more_reviews = 1;
    } else {
      btnText.innerHTML = 'Load More Community Reviews';
      moreText.style.display = 'none';
      this.load_more_reviews = 0;
  }
}
/**
 *
 * function used for intilization of page and get request
 * @memberof BookCommentUserComponent
 */
ngOnInit() {
    this.bookreviews_service.get_review_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.bookreviews_service.get_review_Info_updated().subscribe((review_Information: Bookreviews[]) => {
      this.review_information = review_Information;
      this.SplitString();
      this.SetElements();
      console.log(this.review_information[1].reviewer_id);
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  /**
   *
   * function used to set elements of lists
   * @memberof BookCommentUserComponent
   */
  SetElements() {
// tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.review_information.length; x++) {
      this.reviewerid[x] = this.review_information[x].reviewer_id;
      this.reviewername[x] = this.review_information[x].reviewer_name;
      this.reviewerlikes[x] = this.review_information[x].reviewer_likes;
      this.reviewercomments[x] = this.review_information[x].reviewer_comments;
      this.reviewerimage[x] = this.review_information[x].reviewer_image;
      this.reviewerdate[x] = this.review_information[x].reviewer_date;
      this.reviewerbody[x] = this.review_information[x].reviewer_body;
      this.reviewerrate[x] = this.review_information[x].reviewer_rate;
    }
  }
  /**
   *
   * function used for spliting reviews body into parts
   * @memberof BookCommentUserComponent
   */
  SplitString() {
// tslint:disable-next-line: variable-name
    let starting_indext = 0;
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.review_information.length; i ++) {
      const word = this.review_information[i].reviewer_body.split(',');
      this.befor_dots[starting_indext] = word[0];
      this.after_dots[starting_indext] = word[1];
      starting_indext++;
    }
  }
  /**
   *
   * function used for post request of new comment
   * @param {Bookreviews} index
   * @memberof BookCommentUserComponent
   */
  OnclickComment(index: Bookreviews) {
    this.bookreviews_service.request_reviewer_comment(index.reviewer_id);
  }
  /**
   *
   * function used for post request of likes
   * @param {Bookreviews} index
   * @param {number} cond
   * @memberof BookCommentUserComponent
   */
  OnclickLike(index: Bookreviews, cond: number) {
    const Liked = document.getElementById('liked'+cond);
    const liking = document.getElementById('show-likes'+cond);
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
    this.bookreviews_service.request_reviewer_like(index.reviewer_id, index.reviewer_likes);
  }
}
