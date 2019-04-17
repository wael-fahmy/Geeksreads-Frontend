import { Component, OnInit } from '@angular/core';
import { Bookinformation } from './book-details.model';
import { Subscription } from 'rxjs';
import { BookInformation_Service } from './book-details.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  /**
   *  Panel open state boolean
   */
   public panelOpenState: boolean;
  /**
   *
   * variable list used to store book edtion
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bookedition: string [] = [];
  /**
   *
   * variable list used to store book publish
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bookpublished: string [] = [];
  /**
   *
   * variable list used to store book ASIN
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bookASIN: string [] = [];
  /**
   *
   * variable list used to store book language
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  booklang: string [] = [];
  /**
   *
   * variable list used to store book title
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  booktitle: string [] = [];
  /**
   *
   *  variable list used to store book awards
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bookawards: string [] = [];
  /**
   *
   * variable list used to store book characters
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bookchara: string [] = [];
  /**
   *
   * variable list used to store book id
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bookid: string [] = [];
  // tslint:disable-next-line:variable-name
  /**
   *
   * subscription of services
   * @private
   * @type {Subscription}
   * @memberof BookDetailsComponent
   */
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  /**
   *
   * book datails list vairable to carry from services.ts
   * @type {Bookinformation[]}
   * @memberof BookDetailsComponent
   */
  public book_information: Bookinformation[] = [];
  // tslint:disable-next-line:variable-name
  /**
   *
   * index of the current book from the list
   * @memberof BookDetailsComponent
   */
  book_index = 1;
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of BookDetailsComponent.
   * @param {BookInformation_Service} bookinformation_service
   * @memberof BookDetailsComponent
   */
  constructor(public bookinformation_service: BookInformation_Service) { }
  /**
   *
   * function used to read information from services.ts
   * @memberof BookDetailsComponent
   */
  ngOnInit() {
    this.bookinformation_service.get_book_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.bookinformation_service.get_book_Info_updated().subscribe((book_Information: Bookinformation[]) => {
      this.book_information = book_Information;
      this.SetElements();
      console.log(this.book_information.length);
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  /**
   *
   * function used to set elements of lists
   * @memberof BookDetailsComponent
   */
  SetElements() {
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.book_information.length; x++) {
      this.bookedition[x] = this.book_information[x].book_edition;
      this.bookid[x] = this.book_information[x].book_id;
      this.bookpublished[x] = this.book_information[x].book_published;
      this.bookASIN[x] = this.book_information[x].book_ASIN;
      this.booklang[x] = this.book_information[x].book_language;
      this.booktitle[x] = this.book_information[x].book_title;
      this.bookawards[x] = this.book_information[x].book_awards;
      this.bookchara[x] = this.book_information[x].book_characters;
    }
  }
}
