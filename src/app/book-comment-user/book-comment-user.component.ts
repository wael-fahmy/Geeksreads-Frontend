import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-comment-user',
  templateUrl: './book-comment-user.component.html',
  styleUrls: ['./book-comment-user.component.css']
})
export class BookCommentUserComponent implements OnInit {
  /**
   * @ignore
   * @memberof BookCommentUserComponent
   */
  constructor() { }
  /**
   *
   * function used to count number of likes and update interface
   * @memberof BookCommentUserComponent
   */
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
  more_user_preview() {
    const dots = document.getElementById('dots-user-review');
    const moreText = document.getElementById('more-review');
    const btnText = document.getElementById('myBtn-user-review');
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
   * @ignore
   * @memberof BookCommentUserComponent
   */
  ngOnInit() {
  }

}
