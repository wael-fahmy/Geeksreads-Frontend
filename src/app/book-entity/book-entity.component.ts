import { Component, OnInit } from '@angular/core';
import { BookDetails } from './book-entity.model';
import { Subscription } from 'rxjs';
import { BookTitle_Service } from './book-entity.service';
import { AuthorDetails } from './book-entity.model';
import { delay } from 'q';

@Component({
  selector: 'app-book-entity',
  templateUrl: './book-entity.component.html',
  styleUrls: ['./book-entity.component.css']
})
export class BookEntityComponent implements OnInit {

// tslint:disable-next-line: prefer-const
/**
 *
 * vairbale used to store available option of read button
 * @type {string}
 * @memberof BookEntityComponent
 */
type1: string;
/**
 *
 * vairbale used to store available option of read button
 * @type {string}
 * @memberof BookEntityComponent
 */
type2: string;
/**
 *
 * variable list used to store list of book images
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookimage: string [] = [];
/**
 *
 * variable list used to store list of book titles
 * @type {string []}
 * @memberof BookEntityComponent
 */
booktitle: string [] = [];
/**
 *
 * variable list used to store list of book authors
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookauthorid: string [] = [];
/**
 *
 * vairbale to carry author details
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookauthor: string [] = [];
/**
 *
 * variable list used to store list of book status
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookstatus: string [] = [];
/**
 *
 * variable list used to store list of book bodys
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookbody: string [] = [];
/**
 *
 * variable list used to store list of book id
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookid: string [] = [];
/**
 *
 * vaiable to store book rate
 * @type {number[]}
 * @memberof BookEntityComponent
 */
bookrate: number[] = [];
  // tslint:disable-next-line: variable-name
  /**
   *
   * variable list used to store list of half of book bodys
   * @type {string []}
   * @memberof BookEntityComponent
   */
  public befor_dots: string [] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * variable list used to store list of half of book bodys
 * @type {string []}
 * @memberof BookEntityComponent
 */
public after_dots: string [] = [];
  // tslint:disable-next-line:variable-name
  /**
   *
   * subscription of service
   * @private
   * @type {Subscription}
   * @memberof BookEntityComponent
   */
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  /**
   *
   * carries book details information
   * @type {BookDetails[]}
   * @memberof BookEntityComponent
   */
  public book_details: BookDetails[] = [];
  public author_details: AuthorDetails[] = [];
  // tslint:disable-next-line:variable-name
  /**
   *
   * carries the index of the book
   * @memberof BookEntityComponent
   */
  book_index = 0;
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of BookEntityComponent.
   * @param {BookTitle_Service} booktitle_service
   * @memberof BookEntityComponent
   */
constructor(public booktitle_service: BookTitle_Service) { }
  /**
   *
   * function used to recieve information from services.tss
   * @memberof BookEntityComponent
   */
ngOnInit() {
    //this.booktitle_service.post_book_id('12');
    this.booktitle_service.get_book_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      this.SetInfo();
      this.assign_status(this.book_details[this.book_index].ReadStatus);
      localStorage.setItem('authorID', this.book_details[0].AuthorId);
      localStorage.setItem('bookID', this.book_details[0].BookId);
      console.log(this.bookrate[this.book_index]);
      this.SetRate();
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
    //this.booktitle_service.post_author_id(this.bookauthorid[0]);
    //this.booktitle_service.get_author_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    //this.Sub_profile = this.booktitle_service.get_author_Info_updated().subscribe((author_Information: AuthorDetails[]) => {
     // this.author_details = author_Information;
     // this.SetAuthorInfo();
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
   // });
  }
  /**
   *
   * get author by author id
   * @memberof BookEntityComponent
   */
  GetAuthorByID() {
    this.booktitle_service.post_author_id(this.bookauthorid[this.book_index]);
  }
  /**
   *
   * function used to set elements of lists
   * @memberof BookEntityComponent
   */
  SetInfo() {
// tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.book_details.length; x++) {
      this.bookimage[x] = this.book_details[x].Cover;
      this.booktitle[x] = this.book_details[x].Title;
      this.bookauthorid[x] = this.book_details[x].AuthorId;
      this.bookstatus[x] = this.book_details[x].ReadStatus;
      this.bookauthor[x] = this.book_details[x].Author;
      this.bookbody[x] = this.book_details[x].Description;
      this.bookid[x] = this.book_details[x].BookId;
      this.bookrate[x] = this.book_details[x].BookRating;
      this.SplitString(this.bookbody[x], x);
    }
  }
  SetAuthorInfo() {
    this.bookauthor[0] = this.author_details[0].AuthorName;
  }
  /**
   *
   * function used to split book body
   * @param {string} index
   * @param {*} x
   * @memberof BookEntityComponent
   */
  SplitString(index: string, x) {
      const word = this.book_details[x].Description.split(',');
      this.befor_dots[x] = word[0];
      this.after_dots[x] = word[1];
  }
  SetRate() {
    const rate0 = document.getElementById('star0');
    const rate1 = document.getElementById('star1');
    const rate2 = document.getElementById('star2');
    const rate3 = document.getElementById('star3');
    const rate4 = document.getElementById('star4');
    if (this.bookrate[this.book_index] === 1) {
      rate0.style.color = 'orange';
    } else if (this.bookrate[this.book_index] === 2) {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
    } else if (this.bookrate[this.book_index] === 3) {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
    } else if (this.bookrate[this.book_index] === 4) {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
      rate3.style.color = 'orange';
    } else if (this.bookrate[this.book_index] === 5) {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
      rate3.style.color = 'orange';
      rate4.style.color = 'orange';
    }
  }
  /**
   *
   * button function to show hidden information
   * @memberof BookEntityComponent
   */
more_book_discription() {
    const dots = document.getElementById('dots-book-discription');
    const moreText = document.getElementById('more-book-discription');
    const btnText = document.getElementById('myBtn-book-discription');
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
 * function used to post request of book status
 * @param {string} index
 * @memberof BookEntityComponent
 */
book_status(index: string) {
    const first = document.getElementById(index);
    const second = document.getElementById('first-option');
    let x = first.innerHTML.toString();
    first.innerHTML = second.innerHTML.toString();
    second.innerHTML = x;
    this.booktitle_service.post_book_status(this.book_details[this.book_index].BookId, second.textContent );
  }
/**
 *
 * function used to assign status of book on intilize
 * @param {string} index
 * @memberof BookEntityComponent
 */
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
