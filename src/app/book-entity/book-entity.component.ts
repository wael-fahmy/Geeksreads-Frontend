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
  type1: string;
  type2: string;
  // tslint:disable-next-line: variable-name
  public befor_dots: string [] = [];
// tslint:disable-next-line: variable-name
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
  book_index = 1;
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
      console.log(this.book_details[0].book_id);
      this.assign_status(this.book_details[this.book_index].book_status);
      this.SplitString();
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  SplitString() {
    let starting_indext = 0;
// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.book_details.length; i ++) {
      let word = this.book_details[i].book_body.split(',');
      this.befor_dots[starting_indext] = word[0];
      this.after_dots[starting_indext] = word[1];
      starting_indext++;
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
book_status(index: string) {
    const first = document.getElementById(index);
    const second = document.getElementById('first-option');
    let x = first.innerHTML.toString();
    first.innerHTML = second.innerHTML.toString();
    second.innerHTML = x;
    this.booktitle_service.post_book_status(this.book_details[this.book_index].book_id, second.textContent );
  }
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
