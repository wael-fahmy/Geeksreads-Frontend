import { Component, OnInit, Input } from '@angular/core';
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
@Input() bookID: string;
@Input() bookimage: string;
@Input() booktitle: string;
@Input() bookstatus: string;
@Input() bookbody: string;
@Input() bookrate;
@Input() bookauthorid: string;
/////////////////////////////////////////////////////
type1: string;
type2: string;
bookauthor: string [] = [];
public befor_dots: string [] = [];
public after_dots: string [] = [];
private Sub_profile: Subscription;
public book_details: BookDetails[] = [];
public author_details: AuthorDetails[] = [];
book_index = 0;
constructor(public booktitle_service: BookTitle_Service) { }
ngOnInit() {
    console.log(this.bookID);
    this.SplitString();
    this.SetRate();
    localStorage.setItem('authorID', this.bookauthorid);
    localStorage.setItem('bookID', this.bookID);
    this.booktitle_service.get_author_Info(this.bookauthorid);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_author_Info_updated().subscribe((author_Information: AuthorDetails[]) => {
      this.author_details = author_Information;
      this.SetAuthorInfo();
    });
  }
  SetAuthorInfo() {
    this.bookauthor[this.book_index] = this.author_details[this.book_index].AuthorName;
  }
  SplitString() {
      const ReadMoreBt = document.getElementById('myBtn-book-discription');
      const ReadMoreDot = document.getElementById('dots-book-discription');
      const check = this.bookbody.split(' ');
      if (check.length < 15) {
        ReadMoreBt.style.display = 'none';
        ReadMoreDot.style.display = 'none';
        this.befor_dots[0] = this.bookbody;
        this.after_dots[0] = '';
      } else {
        const word = this.bookbody[0].split(',');
        this.befor_dots[0] = word[0];
        this.after_dots[0] = word[1];
      }
  }
  SetRate() {
    this.bookrate = this.bookrate.$numberDecimal;
    const rate0 = document.getElementById('star0');
    const rate1 = document.getElementById('star1');
    const rate2 = document.getElementById('star2');
    const rate3 = document.getElementById('star3');
    const rate4 = document.getElementById('star4');
    if (this.bookrate.toString() === '1.0') {
      rate0.style.color = 'orange';
    } else if (this.bookrate.toString() === '2.0') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
    } else if (this.bookrate.toString() === '3.0') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
    } else if (this.bookrate.toString() === '4.0') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
      rate3.style.color = 'orange';
    } else if (this.bookrate.toString() === '5.0') {
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
    this.booktitle_service.post_book_status(this.bookID, second.textContent );
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
