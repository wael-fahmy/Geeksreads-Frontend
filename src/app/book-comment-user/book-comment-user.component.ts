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
////////////////////////////////////////////////
public review_information: Bookreviews[] = [];
public befor_dots: string [] = [];
public after_dots: string [] = [];
public load_more_reviews = 0;
constructor(public bookreviews_service: Bookreviews_Service, render: Renderer2) { }

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
ngOnInit() {
    this.bookreviews_service.get_review_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.bookreviews_service.get_review_Info_updated()
    .subscribe((review_Information: Bookreviews[]) => {
      this.review_information = review_Information;
      this.SetElements();
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
      this.reviewerid[x] = this.review_information[x].reviewId;
      this.reviewername[x] = this.review_information[x].userName;
      this.reviewerlikes[x] = this.review_information[x].likesCount;
      this.reviewercomments[x] = this.review_information[x].reviewBody;
      this.reviewerimage[x] = this.review_information[x].photo;
      const fixed = this.review_information[x].reviewDate.split('T');
      this.review_information[x].reviewDate = fixed[0];
      this.reviewerdate[x] = fixed[0];
      this.reviewerbody[x] = this.review_information[x].reviewBody;
      this.reviewerrate[x] = this.review_information[x].rating;
      this.userid[x] = this.review_information[x].userId;
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
      const word = this.review_information[i].reviewBody.split(',');
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
    this.bookreviews_service.request_reviewer_comment(index.userId);
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
    this.bookreviews_service.request_reviewer_like(index.userId,  liking.innerHTML.toString());
  }
}
