import { Component, OnInit } from '@angular/core';
import { BookDetails } from './book-entity.model';
import { Subscription } from 'rxjs';
import { BookTitle_Service } from './book-entity.service';
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
  // tslint:disable-next-line:variable-name
  /**
   *
   * carries the index of the book 
   * @memberof BookEntityComponent
   */
  book_index = 2;
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
    this.booktitle_service.get_book_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name 
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      this.SetInfo();
      this.assign_status(this.book_details[this.book_index].book_status);
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  /**
   *
   * function used to set elements of lists
   * @memberof BookEntityComponent
   */
  SetInfo() {
// tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.book_details.length; x++) {
      this.bookimage[x] = this.book_details[x].book_image;
      this.booktitle[x] = this.book_details[x].book_title;
      this.bookauthor[x] = this.book_details[x].book_author;
      this.bookstatus[x] = this.book_details[x].book_status;
      this.bookbody[x] = this.book_details[x].book_body;
      this.bookid[x] = this.book_details[x].book_id;
      this.SplitString(this.bookbody[x], x);
    }
  }
  /**
   *
   * function used to split book body
   * @param {string} index
   * @param {*} x
   * @memberof BookEntityComponent
   */
  SplitString(index: string, x) {
      const word = this.book_details[x].book_body.split(',');
      this.befor_dots[x] = word[0];
      this.after_dots[x] = word[1];
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
    this.booktitle_service.post_book_status(this.book_details[this.book_index].book_id, second.textContent );
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
