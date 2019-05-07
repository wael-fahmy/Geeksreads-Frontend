import { Component, OnInit, Input } from '@angular/core';
import { BookTitle_Service } from './book-details.service';
import { BookDetails } from './book-details.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

  /**
   *
   * main class
   * @class BookDetailsComponent
   * @implemnets OnInit
   */
export class BookDetailsComponent implements OnInit {
  /**
   *  Panel open state boolean
   */
  ////////////////////////////////////////
  public panelOpenState: boolean;
  /**
   *
   * vairbale to carry book ID
   * @type {string}
   * @memberof BookDetailsComponent
   */
  @Input() bookID: string;
  /**
   *
   * variable to carry book edition
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bdition: string [] = [];
  /**
   *
   * variable to carry book ASIN
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bASIN: string [] = [];
  /**
   *
   * vairbale to carry book title
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  btitle: string [] = [];
  /**
   *
   * variable to carry number of pages
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bpages: string [] = [];
  /**
   *
   *  variable to carry date publishen
   * @type {string []}
   * @memberof BookDetailsComponent
   */
  bpublished: string [] = [];
  /**
   *
   * subscription
   * @private
   * @type {Subscription}
   * @memberof BookDetailsComponent
   */
  private Sub_profile: Subscription;
  /**
   *
   * variable to carry book data
   * @type {BookDetails[]}
   * @memberof BookDetailsComponent
   */
  public book_details: BookDetails[] = [];
  /**
   *
   * variable to carry book index
   * @memberof BookDetailsComponent
   */
  book_index = 0;
  /**
   * Creates an instance of BookDetailsComponent.
   * @param {BookTitle_Service} booktitle_service
   * @memberof BookDetailsComponent
   */
  constructor(public booktitle_service: BookTitle_Service) { }
  /**
   *
   * main starting function
   * @memberof BookDetailsComponent
   */
  ngOnInit() {
    this.booktitle_service.get_book_Info(this.bookID);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      this.SetBookInfor();
      this.CutDate();
    });
  }
  /**
   *
   * function to set book details
   * @memberof BookDetailsComponent
   */
  SetBookInfor() {
    this.bdition[this.book_index] = this.book_details[this.book_index].Publisher;
    this.bASIN[this.book_index] = this.book_details[this.book_index].ISBN;
    this.btitle[this.book_index] = this.book_details[this.book_index].Title;
    this.bpages[this.book_index] = this.book_details[this.book_index].Pages.toString();
    this.bpublished[this.book_index] = this.book_details[this.book_index].Published;
  }
  /**
   *
   * function to set data formate
   * @memberof BookDetailsComponent
   */
  CutDate() {
    const word = this.bpublished[this.book_index].split('T');
    this.bpublished[this.book_index] = word[0];
  }
}
