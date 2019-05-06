import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from './review.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() bookId: string;
  @Input() likesCount: string;
  @Input() photo: string;
  @Input() liked: boolean;
  @Input() rating: number;
  @Input() reviewBody: string;
  @Input() reviewDate: string;
  @Input() reviewId: string;
  @Input() userId: string;
  @Input() userName: string;
  @Input() commCount: string;

  befordots: string;
  afterdots: string;

  constructor(public ReviewServ: ReviewService) { }

  ngOnInit() {
    this.SplitString();
    this.SetRate();
    this.SetLike();
  }
  SplitString() {
    const word = this.reviewBody.split(',');
    this.befordots = word[0];
    this.afterdots = word[1];
  }
  SetLike() {
    const likes = document.getElementById('liked');
    if (this.liked === true) {
      likes.innerHTML = 'Liked';
    } else {
      likes.innerHTML = 'Like';
    }
  }
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
  ClickStorage() {
    localStorage.removeItem('ISBN');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('publishedDate');
    localStorage.removeItem('publisher');
    localStorage.removeItem('pages');
    localStorage.removeItem('genre');
  }
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
      console.log('in here');
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
  LikeReview() {
    console.log(this.reviewId);
    this.ReviewServ.post_Like_Review(this.reviewId);
  }
}
