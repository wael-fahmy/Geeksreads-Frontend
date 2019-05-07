import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from './review.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 *
 * main class
 * @export
 * @class ReviewComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {

  /**
   *
   * variable to carry book id
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() bookId: string;
  /**
   *
   * variable to carry like count
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() likesCount: string;
  /**
   *
   * variable to carry user image
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() photo: string;
  /**
   *
   * variable to carry liked condition
   * @type {boolean}
   * @memberof ReviewComponent
   */
  @Input() liked: boolean;
  /**
   *
   * variable to carry rating
   * @type {number}
   * @memberof ReviewComponent
   */
  @Input() rating: number;
  /**
   *
   * variable to carry user body
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() reviewBody: string;
  /**
   *
   * variable to carry user date
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() reviewDate: string;
  /**
   *
   * variable to carry review id
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() reviewId: string;
  /**
   *
   * vairable to carry user id
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() userId: string;
  /**
   *
   * variable to carry user name
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() userName: string;
  /**
   *
   * vairable to carry comment number
   * @type {string}
   * @memberof ReviewComponent
   */
  @Input() commCount: string;

  /**
   *
   * half of the body
   * @type {string []}
   * @memberof ReviewComponent
   */
  befordots: string [] = [];
  /**
   *
   * half of the body
   * @type {string []}
   * @memberof ReviewComponent
   */
  afterdots: string [] = [];

  /**
   * Creates an instance of ReviewComponent.
   * @param {ReviewService} ReviewServ
   * @param {Router} router
   * @memberof ReviewComponent
   */
  constructor(public ReviewServ: ReviewService, private router: Router) { }

  /**
   *
   * intilize the class
   * @memberof ReviewComponent
   */
  ngOnInit() {
    this.SplitString();
    this.SetRate();
    this.SetLike();
    this.SetDate();
  }
  /**
   *
   * set half of the body
   * @memberof ReviewComponent
   */
  SplitString() {
    const ReadMoreBt = document.getElementById('myBtn-user-review');
    const ReadMoreDot = document.getElementById('dots-user-review');
    const check = this.reviewBody.split(' ');
    if (check.length < 15) {
      ReadMoreBt.style.display = 'none';
      ReadMoreDot.style.display = 'none';
      this.befordots[0] = this.reviewBody;
      this.afterdots[0] = '';
    } else {
      const word = this.reviewBody.split(',');
      this.befordots[0] = word[0];
      this.afterdots[0] = word[1];
    }
}
/**
 *
 * set like condition
 * @memberof ReviewComponent
 */
SetLike() {
    const likes = document.getElementById('liked');
    if (this.liked === true) {
      likes.innerHTML = 'Liked';
    } else {
      likes.innerHTML = 'Like';
    }
  }
  /**
   *
   * variable set date
   * @memberof ReviewComponent
   */
  SetDate() {
    const word = this.reviewDate.split('T');
    this.reviewDate = word[0];
  }
  /**
   *
   * more button
   * @memberof ReviewComponent
   */
  more_user_preview() {
    let dots: HTMLElement;
    let moreText: HTMLElement;
    let btnText: HTMLElement;
    dots = document.getElementById('dots-user-review');
    moreText = document.getElementById('more-review');
    btnText = document.getElementById('myBtn-user-review');
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
   * function to clear storage
   * @memberof ReviewComponent
   */
  ClickStorage() {
    localStorage.removeItem('ISBN');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('publishedDate');
    localStorage.removeItem('publisher');
    localStorage.removeItem('pages');
    localStorage.removeItem('genre');
    this.router.navigate(['/reviews', this.reviewId, this.bookId]);
  }
  /**
   *
   * function to set rate
   * @memberof ReviewComponent
   */
  SetRate() {
    const rate = this.rating.toString();
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
  /**
   *
   * post request to like or unlike
   * @memberof ReviewComponent
   */
  LikeReview() {
    if (this.liked === false) {
      this.ReviewServ.post_Like_Review(this.reviewId);
      location.reload();
    } else if (this.liked === true) {
      this.ReviewServ.post_UnLike_Review(this.reviewId);
      location.reload();
    }
  }
}
