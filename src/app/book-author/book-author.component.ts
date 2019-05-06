import { Component, OnInit, Input } from '@angular/core';
import { AuthorDetails } from './book-author.model';
import { Subscription } from 'rxjs';
import { Book } from '../book/book.model';
import { Book_Service } from '../book/book.service';
import { AuthorDetails_Service } from './book-author.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-author',
  templateUrl: './book-author.component.html',
  styleUrls: ['./book-author.component.css']
})
export class BookAuthorComponent implements OnInit {
  /**
   *  Panel open state boolean
   */
  public panelOpenState: boolean;
  /**
   *
   * variable to carry author name list
   * @type {string []}
   * @memberof BookAuthorComponent
   */
  @Input() BookID: string;
  authid: string;
  authorname: string [] = [];
  /**
   *
   * variable to carry author id list
   * @type {string []}
   * @memberof BookAuthorComponent
   */
  authorid: string [] = [];
  /**
   *
   * variable tp carry user id
   * @type {string []}
   * @memberof BookAuthorComponent
   */
  userid: string [] = [];
  /**
   *
   * variable to carry author body list
   * @type {string []}
   * @memberof BookAuthorComponent
   */
  authorbody: string [] = [];
  /**
   *
   * variable to carry author followers number list
   * @type {string []}
   * @memberof B.okAuthorComponent
   */
  authorfollowers: string [] = [];
  /**
   *
   * variable to carry author book id list
   * @type {string []}
   * @memberof BookAuthorComponent
   */
  bookid: string [] = [];
  /**
   *
   * variable to carry author image list
   * @type {string []}
   * @memberof BookAuthorComponent
   */
  authorimage: string [] = [];
  /**
   *
   * variable to carry half author body list
   * @type {string []}
   * @memberof BookAuthorComponent
   */
  public befor_dots: string [] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * variable to carry half author body list
 * @type {string []}
 * @memberof BookAuthorComponent
 */
public after_dots: string [] = [];
// tslint:disable-next-line: variable-na
  /**
   *
   * server subscription
   * @private
   * @type {Subscription}
   * @memberof BookAuthorComponent
   */
  private Sub_profile: Subscription;
  authorIsFollowing = false;
  // tslint:disable-next-line:variable-name
  /**
   *
   * variable to carry recieved author details list from services.ts
   * @type {AuthorDetails[]}
   * @memberof BookAuthorComponent
   */
  public author_details: AuthorDetails[] = [];
  private book_details: Book[] = [];
  // tslint:disable-next-line:variable-name
  /**
   *
   * index of the current author in the list
   * @memberof BookAuthorComponent
   */
  author_index = 0;
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of BookAuthorComponent.
   * @param {AuthorDetails_Service} authordetails_service
   * @memberof BookAuthorComponent
   */
  constructor(public authordetails_service: AuthorDetails_Service, public booktitle_service: Book_Service) { }
  /**
   *
   * function used to read author list from services.ts
   * @memberof BookAuthorComponent
   */
  ngOnInit() {
    let auth;
    this.booktitle_service.get_book_Info(this.BookID);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: Book[]) => {
      this.book_details = book_Information;
      auth = this.book_details[0].AuthorId;
      this.authordetails_service.get_author_Info(auth);  
    });                              // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.authordetails_service.get_author_details_updated().subscribe((author_Information: AuthorDetails[]) => {
      this.author_details = author_Information;
      console.log(this.author_details);
      this.SplitString(this.author_details[0].About);
      this.SetElements();
      localStorage.removeItem('authorID');
    });
  }
  /**
   *
   * function to follow author
   * @memberof BookAuthorComponent
   */
  followAuthor() {
    // TODO: Send request
    this.authorIsFollowing = true;
    const number = document.getElementById('number-followers');
// tslint:disable-next-line: radix
    let x = number.innerHTML.toString();
// tslint:disable-next-line: radix
    let y = parseInt(x);
    y = y + 1;
    x = y.toString();
    //number.innerHTML = x;
    console.log(this.authorid[this.author_index]);
    this.authordetails_service.post_author_follow(this.authorid[this.author_index]);
    console.log('Following this author');
  }
  Clear_Storage() {
    localStorage.removeItem('ISBN');
    localStorage.removeItem('genre');
    localStorage.removeItem('pages');
    localStorage.removeItem('publishedDate');
    localStorage.removeItem('publisher');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('bookID');
}
  /**
   *
   * function to unfollow author
   * @memberof BookAuthorComponent
   */
  unfollowAuthor() {
    // TODO: Send request
    this.authorIsFollowing = false;
    // this.authorNumberOfFollowers -= 1;
    const number = document.getElementById('number-followers');
// tslint:disable-next-line: radix
    let x = number.innerHTML.toString();
// tslint:disable-next-line: radix
    let y = parseInt(x);
    y = y - 1;
    x = y.toString();
    number.innerHTML = x;
    this.authordetails_service.post_author_unfollow(this.authorid[this.author_index]);
    console.log('Unfollowing this author');
  }
  /**
   *
   * function used for spliting author body
   * @memberof BookAuthorComponent
   */
  SplitString(index: string) {
    const word = this.author_details[0].About.split(',');
    this.befor_dots[0] = word[0];
    this.after_dots[0] = word[1];
    const ReadMoreBt = document.getElementById('myBtn-author-discription');
    const ReadMoreDot = document.getElementById('dots-author-discription');
    console.log(this.author_details[0]);
    console.log(this.befor_dots[0].length);
    const check = this.author_details[0].About.split(' ');
    if (check.length < 15) {
      ReadMoreBt.style.display = 'none';
      ReadMoreDot.style.display = 'none';
    }
}
  /**
   *
   * function used to set list elements
   * @memberof BookAuthorComponent
   */
  SetElements() {
    // tslint:disable-next-line: prefer-for-of
        for (let x = 0; x < this.author_details.length; x++) {
          this.authorname[x] = this.author_details[x].AuthorName;
          this.authorid[x] = this.author_details[x].AuthorId;
          this.authorbody[x] = this.author_details[x].About;
          this.authorfollowers[x] = this.author_details[x].FollowingUserId.length.toString();
          this.bookid[x] = this.author_details[x].BookId;
          this.authorimage[x] = this.author_details[x].Photo;
        }
      }
  /**
   *
   * function used to show hidden information of the author details
   * @memberof BookAuthorComponent
   */
  more_author_details() {
    const dots = document.getElementById('dots-author-discription');
    const moreText = document.getElementById('more-author-discription');
    const btnText = document.getElementById('myBtn-author-discription');
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
}
