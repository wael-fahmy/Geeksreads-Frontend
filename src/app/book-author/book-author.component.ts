import { Component, OnInit, Input } from '@angular/core';
import { AuthorDetails } from './book-author.model';
import { Subscription } from 'rxjs';
import { Book } from '../book/book.model';
import { Book_Service } from '../book/book.service';
import { AuthorDetails_Service } from './book-author.service';
import { delay } from 'q';
import { Router } from '@angular/router';
/**
 *
 * class used to implement logic
 * @export
 * @class BookAuthorComponent
 * @implements {OnInit}
 */
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
   * variable to carry book id
   * @type {string}
   * @memberof BookAuthorComponent
   */
  @Input() BookID: string;
  /**
   *
   * vairbale to carry author id
   * @type {string}
   * @memberof BookAuthorComponent
   */
  authid: string;
  /**
   *
   * vairbale to carry author name
   * @type {string []}
   * @memberof BookAuthorComponent
   */
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
  /**
   *
   * boolea used for checking following auhtor
   * @memberof BookAuthorComponent
   */
  authorIsFollowing = false;
  // tslint:disable-next-line:variable-name
  /**
   *
   * variable to carry recieved author details list from services.ts
   * @type {AuthorDetails[]}
   * @memberof BookAuthorComponent
   */
  public author_details: AuthorDetails[] = [];
  /**
   *
   * variable to carry book details
   * @private
   * @type {Book[]}
   * @memberof BookAuthorComponent
   */
  private book_details: Book[] = [];
  /**
   *
   * vairbale to carry follow updated
   * @type {AuthorDetails}
   * @memberof BookAuthorComponent
   */
  public follow: AuthorDetails;
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
  constructor(public authordetails_service: AuthorDetails_Service, public booktitle_service: Book_Service,
              public router: Router) { }
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
      this.SetElements();
      this.SetFollow(author_Information);
      localStorage.removeItem('authorID');
    });
  }
  /**
   *
   * function to set follow button
   * @param {AuthorDetails []} author
   * @returns
   * @memberof BookAuthorComponent
   */
  SetFollow(author: AuthorDetails []) {
    const userid = localStorage.getItem('userId');
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < author[0].FollowingUserId.length; i++) {
      if (author[0].FollowingUserId[i] === userid) {
        this.authorIsFollowing = true;
        console.log('already followed this author');
        return;
      }
    }
    this.authorIsFollowing = false;
  }
  /**
   *
   * function to follow author
   * @returns
   * @memberof BookAuthorComponent
   */
  followAuthor() {
    // TODO: Send request
// tslint:disable-next-line: prefer-for-of
    const userid = localStorage.getItem('userId');
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.author_details[0].FollowingUserId.length; i++) {
      if (this.author_details[0].FollowingUserId[i] === userid) {
        return;
      }
    }
    const number = document.getElementById('number-followers');
// tslint:disable-next-line: radix
    let x = number.innerHTML.toString();
// tslint:disable-next-line: radix
    let y = parseInt(x);
    y = y + 1;
    x = y.toString();
    //number.innerHTML = x;
    this.authordetails_service.post_author_follow(this.authorid[this.author_index]);
    //this.authorfollowers[0] = this.GetNumberOfFollowers();
    //number.innerHTML = x;
    this.ngOnInit();
  }
  /**
   *
   * function to get updated number of users
   * @returns {string}
   * @memberof BookAuthorComponent
   */
  GetNumberOfFollowers(): string {
      this.authordetails_service.get_author_Info(this.authorid[this.author_index]);
      this.Sub_profile = this.authordetails_service.get_author_details_updated()
      .subscribe((authorInformation: AuthorDetails[]) => {
        this.author_details = authorInformation;
        this.SetFollow(authorInformation);
        return authorInformation[0].FollowingUserId.length.toString();
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
      return '';
  }
  /**
   *
   * function to clear local storage
   * @memberof BookAuthorComponent
   */
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
    // this.authorNumberOfFollowers -= 1;
    const number = document.getElementById('number-followers');
// tslint:disable-next-line: radix
    let x = number.innerHTML.toString();
// tslint:disable-next-line: radix
    let y = parseInt(x);
    y = y - 1;
    x = y.toString();
    this.authordetails_service.post_author_unfollow(this.authorid[this.author_index]);
    //this.authorfollowers[0] = this.GetNumberOfFollowers();
    //number.innerHTML = x;
    this.ngOnInit();
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
          this.befor_dots[x] = this.author_details[x].About;
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
