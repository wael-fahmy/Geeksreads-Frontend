import { Component, OnInit, Input } from '@angular/core';
import { BookDetails } from './book-entity.model';
import { Subscription } from 'rxjs';
import { BookTitle_Service } from './book-entity.service';
import { ReadStatus } from './book-entity.model';

@Component({
  selector: 'app-book-entity',
  templateUrl: './book-entity.component.html',
  styleUrls: ['./book-entity.component.css']
})
export class BookEntityComponent implements OnInit {
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
bookimage: string [] = [];
booktitle: string [] = [];
bookstatus: string [] = [];
bookbody: string [] = [];
bookrate: string[] = [];
bookauthorid: string [] = [];
type1: string;
type2: string;
type3: string;
bookauthor: string [] = [];
public befor_dots: string [] = [];
public after_dots: string [] = [];
private Sub_profile: Subscription;
public book_details: BookDetails[] = [];
public Read_status: ReadStatus;
book_index = 0;
constructor(public booktitle_service: BookTitle_Service) { }
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
      console.log('ts');
      console.log(this.Read_status);
      this.SetReadStatus();
    });
  }
  SetReadStatus() {
    this.bookstatus[this.book_index] = this.Read_status.ReturnMsg;
    if (this.bookstatus[this.book_index] === 'This BookId is Not in any Shelf, Please Add it to Shelf First') {
      this.bookstatus[this.book_index] = 'Add To Shelf';
      this.assign_status(this.bookstatus[this.book_index]);
    } else {
      this.assign_status(this.bookstatus[this.book_index]);
    }
  }
  SetBookInfor() {
    this.bookauthorid[this.book_index] = this.book_details[this.book_index].AuthorId;
    this.bookimage[this.book_index] = this.book_details[this.book_index].Cover;
    this.booktitle[this.book_index] = this.book_details[this.book_index].Title;
    this.bookbody[this.book_index] = this.book_details[this.book_index].Description;
    this.bookauthor[this.book_index] = this.book_details[this.book_index].AuthorName;
    this.bookrate[this.book_index] = this.book_details[this.book_index].RateCount.toString();
  }
  PostRate(rate: string) {
    console.log(rate);
    if (rate === 'rate-first') {
      this.booktitle_service.post_book_rate(this.bookID, 1);
      this.ngOnInit();
    } else if (rate === 'rate-second') {
      this.booktitle_service.post_book_rate(this.bookID, 2);
      this.ngOnInit();
    } else if (rate === 'rate-third') {
      this.booktitle_service.post_book_rate(this.bookID, 3);
      this.ngOnInit();
    } else if (rate === 'rate-fourth') {
      this.booktitle_service.post_book_rate(this.bookID, 4);
      this.ngOnInit();
    } else if (rate === 'rate-fifth') {
      this.booktitle_service.post_book_rate(this.bookID, 5);
      this.ngOnInit();
    }
  }
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
  SetRate() {
    this.bookrate[this.book_index] = this.bookrate[this.book_index];
    const rate0 = document.getElementById('star0');
    const rate1 = document.getElementById('star1');
    const rate2 = document.getElementById('star2');
    const rate3 = document.getElementById('star3');
    const rate4 = document.getElementById('star4');
    if (this.bookrate[this.book_index].toString() === '1') {
      rate0.style.color = 'orange';
    } else if (this.bookrate[this.book_index].toString() === '2') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
    } else if (this.bookrate[this.book_index].toString() === '3') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
    } else if (this.bookrate[this.book_index].toString() === '4') {
      rate0.style.color = 'orange';
      rate1.style.color = 'orange';
      rate2.style.color = 'orange';
      rate3.style.color = 'orange';
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
book_status_Post(indexfirst: string, indexsecond: string) {
  const first = document.getElementById(indexfirst);
  const second = document.getElementById(indexsecond);
  const y = first.textContent;
  const x = second.textContent;
  if (y === 'Read') {
    this.booktitle_service.Remove_Book(this.bookID);
    first.textContent = 'Add To Shelf';
    this.assign_status(first.textContent);
  } else if (y === 'Want To Read') {
    if (x === 'Remove From Shelve') {
      this.booktitle_service.Remove_Book(this.bookID);
      first.textContent = 'Add To Shelf';
      this.assign_status(first.textContent);
    } else {
      this.booktitle_service.add_book_to_shelf_reading(this.bookID);
      first.textContent = x;
      this.assign_status(x);
    }
  } else if (y === 'Currently Reading') {
    if (x === 'Remove From Shelve') {
      this.booktitle_service.Remove_Book(this.bookID);
      first.textContent = 'Add To Shelf';
      this.assign_status(first.textContent);
    } else {
      this.booktitle_service.add_book_to_shelf_read(this.bookID);
      first.textContent = x;
      this.assign_status(x);
    }
  } else if (y === 'Add To Shelf') {
    this.booktitle_service.AddToShelf(this.bookID, x);
    first.textContent = x;
    this.assign_status(x);
  }
  console.log('missed');
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
