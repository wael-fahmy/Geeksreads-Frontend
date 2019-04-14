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

  bookedition: string [] = [];
  bookpublished: string [] = [];
  bookASIN: string [] = [];
  booklang: string [] = [];
  booktitle: string [] = [];
  bookawards: string [] = [];
  bookchara: string [] = [];
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
