import { Component, OnInit, Input } from '@angular/core';
import { BookDetails } from './book-entity.model';
import { Subscription } from 'rxjs';
import { BookTitle_Service } from './book-entity.service';
import { ReadStatus } from './book-entity.model';
import { MatSnackBar } from '@angular/material';
import { delay } from 'q';
import { timeout } from 'rxjs/operators';
/**
 *
 * main class
 * @export
 * @class BookEntityComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-book-entity',
  templateUrl: './book-entity.component.html',
  styleUrls: ['./book-entity.component.css']
})

export class BookEntityComponent implements OnInit {
/**
 *
 * varaible to carry book id
 * @type {string}
 * @memberof BookEntityComponent
 */
@Input() bookID: string;
/*
@Input() bookimage: string;
@Input() booktitle: string;
@Input() bookstatus: string;
@Input() bookbody: string;
@Input() bookrate;
@Input() bookauthorid: string;
*/
/////////////////////////////////////////////////////
/**
 *
 * variable to carry book image
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookimage: string [] = [];
/**
 *
 * variable to carry book title
 * @type {string []}
 * @memberof BookEntityComponent
 */
booktitle: string [] = [];
/**
 *
 * variable to carry book status
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookstatus: string [] = [];
/**
 *
 * variable to carry book body
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookbody: string [] = [];
/**
 *
 * variable to carry book rate
 * @type {string[]}
 * @memberof BookEntityComponent
 */
bookrate: string[] = [];
/**
 *
 * varaible to carry book author id
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookauthorid: string [] = [];
/**
 *
 * variable to carry status 1
 * @type {string}
 * @memberof BookEntityComponent
 */
type1: string;
/**
 *
 * variable to carry status 2
 * @type {string}
 * @memberof BookEntityComponent
 */
type2: string;
/**
 *
 * variable to carry status 3
 * @type {string}
 * @memberof BookEntityComponent
 */
type3: string;
/**
 *
 * variable to carry author name
 * @type {string []}
 * @memberof BookEntityComponent
 */
bookauthor: string [] = [];
/**
 *
 * variable to carry hald of the body
 * @type {string []}
 * @memberof BookEntityComponent
 */
public befor_dots: string [] = [];
/**
 *
 * vairable to carry half of the body
 * @type {string []}
 * @memberof BookEntityComponent
 */
public after_dots: string [] = [];
/**
 *
 * subscription
 * @private
 * @type {Subscription}
 * @memberof BookEntityComponent
 */
private Sub_profile: Subscription;
/**
 *
 * variable to carry book details
 * @type {BookDetails[]}
 * @memberof BookEntityComponent
 */
public book_details: BookDetails[] = [];
/**
 *
 * variable to carry read status
 * @type {ReadStatus}
 * @memberof BookEntityComponent
 */
public Read_status: ReadStatus;
/**
 *
 * variable to carry book index
 * @memberof BookEntityComponent
 */
book_index = 0;
/**
 * Creates an instance of BookEntityComponent.
 * @param {BookTitle_Service} booktitle_service
 * @param {MatSnackBar} snackbar
 * @memberof BookEntityComponent
 */
constructor(public booktitle_service: BookTitle_Service, public snackbar: MatSnackBar) { }
/**
 *
 * function to intilize class
 * @memberof BookEntityComponent
 */
ngOnInit() {
    this.booktitle_service.get_book_Info(this.bookID);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      this.SetBookInfor();
      this.SplitString();
      this.SetRate();
      localStorage.removeItem('bookID');
    });
    this.booktitle_service.Get_book_status(this.bookID);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_status_Info_updated().subscribe((status_Information: ReadStatus) => {
      this.Read_status = status_Information;
      this.SetReadStatus();
    });
  }
  /**
   *
   * function to set book status
   * @memberof BookEntityComponent
   */
  SetReadStatus() {
    this.bookstatus[this.book_index] = this.Read_status.ReturnMsg;
    if (this.bookstatus[this.book_index] === 'This BookId is Not in any Shelf, Please Add it to Shelf First') {
      this.bookstatus[this.book_index] = 'Add To Shelf';
      this.assign_status(this.bookstatus[this.book_index]);
    } else if (localStorage.getItem('token') === null) {
      this.bookstatus[this.book_index] = 'Add To Shelf';
      this.assign_status(this.bookstatus[this.book_index]);
    } else {
      this.assign_status(this.bookstatus[this.book_index]);
    }
  }
  /**
   *
   * function to set book information
   * @memberof BookEntityComponent
   */
  SetBookInfor() {
    this.bookauthorid[this.book_index] = this.book_details[this.book_index].AuthorId;
    this.bookimage[this.book_index] = this.book_details[this.book_index].Cover;
    this.booktitle[this.book_index] = this.book_details[this.book_index].Title;
    this.bookbody[this.book_index] = this.book_details[this.book_index].Description;
    this.bookauthor[this.book_index] = this.book_details[this.book_index].AuthorName;
    this.bookrate[this.book_index] = this.book_details[this.book_index].BookRating.toString();
  }
  /**
   *
   * function to post rate
   * @param {string} rate
   * @memberof BookEntityComponent
   */
  PostRate(rate: string) {
    if (rate === 'rate-first') {
      this.booktitle_service.post_book_rate(this.bookID, 1);
      const snackbaref = this.snackbar.open('Book Has Been Rated', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.ngOnInit();
    } else if (rate === 'rate-second') {
      this.booktitle_service.post_book_rate(this.bookID, 2);
      const snackbaref = this.snackbar.open('Book Has Been Rated', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.ngOnInit();
    } else if (rate === 'rate-third') {
      this.booktitle_service.post_book_rate(this.bookID, 3);
      const snackbaref = this.snackbar.open('Book Has Been Rated', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.ngOnInit();
    } else if (rate === 'rate-fourth') {
      this.booktitle_service.post_book_rate(this.bookID, 4);
      const snackbaref = this.snackbar.open('Book Has Been Rated', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.ngOnInit();
    } else if (rate === 'rate-fifth') {
      this.booktitle_service.post_book_rate(this.bookID, 5);
      const snackbaref = this.snackbar.open('Book Has Been Rated', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.ngOnInit();
    }
  }
  /**
   *
   * function to split string
   * @memberof BookEntityComponent
   */
  SplitString() {
      const ReadMoreBt = document.getElementById('myBtn-book-discription');
      const ReadMoreDot = document.getElementById('dots-book-discription');
      const check = this.bookbody[0].split(' ');
      if (check.length < 15) {
        ReadMoreBt.style.display = 'none';
        ReadMoreDot.style.display = 'none';
        this.befor_dots[0] = this.bookbody[0];
        this.after_dots[0] = '';
      } else {
        const word = this.bookbody[0].split(',');
        this.befor_dots[0] = word[0];
        this.after_dots[0] = word[1];
      }
  }
  /**
   *
   * function to set rate
   * @memberof BookEntityComponent
   */
  SetRate() {
    const rate0 = document.getElementById('star0');
    const rate1 = document.getElementById('star1');
    const rate2 = document.getElementById('star2');
    const rate3 = document.getElementById('star3');
    const rate4 = document.getElementById('star4');
    if (this.bookrate[this.book_index].toString() === '1') {
      rate0.style.color = 'orange';
      rate1.style.color = 'black';
      rate2.style.color = 'black';
      rate3.style.color = 'black';
      rate4.style.color = 'black';
    } else if (this.bookrate[this.book_index].toString() === '2') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'black';
      rate3.style.color = 'black';
      rate4.style.color = 'black';
    } else if (this.bookrate[this.book_index].toString() === '3') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
      rate3.style.color = 'black';
      rate4.style.color = 'black';
    } else if (this.bookrate[this.book_index].toString() === '4') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
      rate3.style.color = 'orange';
      rate4.style.color = 'black';
    } else if (this.bookrate[this.book_index].toString() === '5') {
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
 * function used to assign status of book on intilize
 * @param {string} index
 * @memberof BookEntityComponent
 */
assign_status(index: string) {
  if (index === 'Want To Read') {
    this.type1 = 'Currently Reading';
    this.type2 = 'Remove From Shelve';
    this.type3 = '';
  } else if (index === 'Read') {
    this.type1 = 'Remove From Shelve';
    this.type2 = '';
    this.type3 = '';
  } else if (index === 'Currently Reading') {
    this.type1 = 'Read';
    this.type2 = 'Remove From Shelve';
    this.type3 = '';
  } else if (index === 'Add To Shelf') {
    this.type1 = 'Want To Read';
    this.type2 = 'Currently Reading';
    this.type3 = 'Read';
  }
}
/**
 *
 * function to post book status
 * @param {string} indexfirst
 * @param {string} indexsecond
 * @memberof BookEntityComponent
 */
book_status_Post(indexfirst: string, indexsecond: string) {
  const first = document.getElementById(indexfirst);
  const second = document.getElementById(indexsecond);
  const y = first.textContent;
  const x = second.textContent;
  if (y === 'Read') {
    this.booktitle_service.Remove_Book(this.bookID);
    first.textContent = 'Add To Shelf';
    const snackbaref = this.snackbar.open('Book Has Been Removed', ' ' , {
      horizontalPosition: 'end',
      duration: 2000
    });
    this.assign_status(first.textContent);
  } else if (y === 'Want To Read') {
    if (x === 'Remove From Shelve') {
      this.booktitle_service.Remove_Book(this.bookID);
      first.textContent = 'Add To Shelf';
      const snackbaref = this.snackbar.open('Book Has Been Removed', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.assign_status(first.textContent);
    } else {
      this.booktitle_service.add_book_to_shelf_reading(this.bookID);
      first.textContent = x;
      const snackbaref = this.snackbar.open('Book Has Been Added To Currently Reading', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.assign_status(x);
    }
  } else if (y === 'Currently Reading') {
    if (x === 'Remove From Shelve') {
      this.booktitle_service.Remove_Book(this.bookID);
      first.textContent = 'Add To Shelf';
      const snackbaref = this.snackbar.open('Book Has Been Removed', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.assign_status(first.textContent);
    } else {
      this.booktitle_service.add_book_to_shelf_read(this.bookID);
      first.textContent = x;
      const snackbaref = this.snackbar.open('Book Has Been Added to Read', ' ' , {
        horizontalPosition: 'end',
        duration: 2000
      });
      this.assign_status(x);
    }
  } else if (y === 'Add To Shelf') {
    this.booktitle_service.AddToShelf(this.bookID, x);
    first.textContent = x;
    const snackbaref = this.snackbar.open('Book Has Been Added', ' ' , {
      horizontalPosition: 'end',
      duration: 2000
    });
    this.assign_status(x);
  }
}
/**
 *
 * function to clear local storage
 * @memberof BookEntityComponent
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
}
