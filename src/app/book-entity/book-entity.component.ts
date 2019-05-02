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
type1: string;
type2: string;
bookimage: string [] = [];
booktitle: string [] = [];
bookauthorid: string [] = [];
bookauthor: string [] = [];
bookstatus: string [] = [];
bookbody: string [] = [];
bookid: string [] = [];
bookrate: number[] = [];
public befor_dots: string [] = [];
public after_dots: string [] = [];
private Sub_profile: Subscription;
public book_details: BookDetails[] = [];
public author_details: AuthorDetails[] = [];
book_index = 0;
constructor(public booktitle_service: BookTitle_Service) { }
ngOnInit() {
    const bookid = '5c9114a0d345b4a65637eacc';
    //this.booktitle_service.post_book_id('12');
    this.booktitle_service.get_book_Info(bookid);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      this.SetInfo();
      this.assign_status(this.book_details[this.book_index].ReadStatus);
      localStorage.setItem('authorID', this.book_details[0].AuthorId);
      localStorage.setItem('bookID', this.book_details[0].BookId);
      localStorage.setItem('ISBN', this.book_details[0].ISBN);
      localStorage.setItem('genre', this.book_details[0].Genre);
      localStorage.setItem('pages', this.book_details[0].Pages.toString());
      localStorage.setItem('publishedDate', this.book_details[0].Published);
      localStorage.setItem('bookTitle', this.book_details[0].Title);
      localStorage.setItem('publisher', this.book_details[0].Publisher);
      this.SetRate();
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
    const author = localStorage.getItem('authorID');
    this.booktitle_service.get_author_Info(author);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_author_Info_updated().subscribe((author_Information: AuthorDetails[]) => {
      this.author_details = author_Information;
      this.SetAuthorInfo();
    });
  }
  /**
   *
   * get author by author id
   * @memberof BookEntityComponent
   */
  /*GetAuthorByID() {
    this.booktitle_service.post_author_id(this.bookauthorid[this.book_index]);
  }*/
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
      this.bookrate[x] = this.book_details[x].BookRating.$numberDecimal;
      this.SplitString(this.bookbody[x], x);
    }
  }
  SetAuthorInfo() {
    this.bookauthor[this.book_index] = this.author_details[this.book_index].AuthorName;
    this.bookauthorid[this.book_index] = this.author_details[this.book_index].AuthorId;
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
      const ReadMoreBt = document.getElementById('myBtn-book-discription');
      const ReadMoreDot = document.getElementById('dots-book-discription');
      console.log(this.bookbody[x]);
      console.log(this.befor_dots[x].length);
      const check = this.bookbody[x].split(' ');
      if (check.length < 15) {
        ReadMoreBt.style.display = 'none';
        ReadMoreDot.style.display = 'none';
      }
  }
  SetRate() {
    const rate0 = document.getElementById('star0');
    const rate1 = document.getElementById('star1');
    const rate2 = document.getElementById('star2');
    const rate3 = document.getElementById('star3');
    const rate4 = document.getElementById('star4');
    if (this.bookrate[this.book_index].toString() === '1.0') {
      rate0.style.color = 'orange';
    } else if (this.bookrate[this.book_index].toString() === '2.0') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
    } else if (this.bookrate[this.book_index].toString() === '3.0') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
    } else if (this.bookrate[this.book_index].toString() === '4.0') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
      rate3.style.color = 'orange';
    } else if (this.bookrate[this.book_index] === 5.0) {
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
