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
  private Sub_profile: Subscription;
  
// tslint:disable-next-line: variable-name
  public review_information: Bookreviews[] = [];
// tslint:disable-next-line: variable-name
  public befor_dots: string [] = [];
// tslint:disable-next-line: variable-name
  public after_dots: string [] = [];
// tslint:disable-next-line: variable-name
  public load_more_reviews = 0;
// tslint:disable-next-line: variable-name
  review_index = 0;
// tslint:disable-next-line: variable-name
  constructor(public bookreviews_service: Bookreviews_Service) { }
  
  like() {
    let likes = 60;
    // tslint:disable-next-line:variable-name
    let user_liked = 0;
    document.getElementById('show_likes').innerHTML = likes.toString();
    if (user_liked === 0) {
      likes = likes + 1;
      user_liked = 1;
    } else {
      if (likes === 0) {
        likes = 0;
      } else {
        likes = likes - 1;
        user_liked = 0;
      }
    }
  }
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
    this.Sub_profile = this.bookreviews_service.get_review_Info_updated().subscribe((review_Information: Bookreviews[]) => {
      this.review_information = review_Information;
      this.SplitString();
      console.log(this.review_information[0].reviewer_id);
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  SplitString() {
    let starting_indext = 0;
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.review_information.length; i ++) {
      let word = this.review_information[i].reviewer_body.split(',');
      this.befor_dots[starting_indext] = word[0];
      this.after_dots[starting_indext] = word[1];
      starting_indext++;
    }
  }
  OnclickComment(index: Bookreviews) {
    this.bookreviews_service.request_reviewer_comment(index.reviewer_id);
  }
  OnclickLike(index: Bookreviews, cond: string) {
    const Liked = document.getElementById('liked'+cond);
    if(Liked.innerHTML === 'Like') {
      Liked.innerHTML = 'Liked';
    } else {
      Liked.innerHTML = 'Like';
    }
    this.bookreviews_service.request_reviewer_like(index.reviewer_id, index.reviewer_likes);
  }
}
