import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { Subscription } from 'rxjs';
import { Book_Service } from './book.service';
import { ActivatedRoute } from '@angular/router';

/**
 *
 * main class
 * @export
 * @class BookComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {
  /**
   *
   * url parameter
   * @memberof BookComponent
   */
  SnapshotParam = 'initial value';
  /**
   *
   * subscription
   * @private
   * @type {Subscription}
   * @memberof BookComponent
   */
  private Sub_profile: Subscription;
  /**
   *
   * variable to carry book details
   * @type {Book[]}
   * @memberof BookComponent
   */
  public book_details: Book[] = [];
  /**
   *
   * variable to carry book image
   * @type {string}
   * @memberof BookComponent
   */
  Image: string;
  /**
   *
   * vairbale to carry author id
   * @type {string []}
   * @memberof BookComponent
   */
  Ahid: string [] = [];
  /**
   *
   * variable to carry book title
   * @type {string}
   * @memberof BookComponent
   */
  title: string;
  /**
   *
   * vairbale to carry book status
   * @type {string}
   * @memberof BookComponent
   */
  status: string;
  /**
   *
   * variable to carry book about
   * @type {string}
   * @memberof BookComponent
   */
  body: string;
  /**
   *
   * vairbale to carry book rate
   * @memberof BookComponent
   */
  rate;
  /**
   *
   * vairable to carry book isbn
   * @type {string}
   * @memberof BookComponent
   */
  asin: string;
  /**
   *
   * vairbale to carry book edition
   * @type {string}
   * @memberof BookComponent
   */
  edtition: string;
  /**
   *
   * vairbale to carry number of pages
   * @type {string}
   * @memberof BookComponent
   */
  pages: string;
  /**
   *
   * vairable to carry book date
   * @type {string}
   * @memberof BookComponent
   */
  date: string;
  /**
   *
   * variable to carry book Genre
   * @type {string}
   * @memberof BookComponent
   */
  Genre: string;
  /**
   * Creates an instance of BookComponent.
   * @param {Book_Service} booktitle_service
   * @param {ActivatedRoute} route
   * @memberof BookComponent
   */
  constructor(public booktitle_service: Book_Service, private route: ActivatedRoute) { }
  /**
   *
   * intialize function
   * @memberof BookComponent
   */
  ngOnInit() {
    this.SnapshotParam = this.route.snapshot.paramMap.get('bookid');
    this.booktitle_service.get_book_Info(this.SnapshotParam);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: Book[]) => {
      this.book_details = book_Information;
      this.SetinfoData(book_Information[0]);
    });
  }
  /**
   *
   * set information of book
   * @param {Book} book_details
   * @memberof BookComponent
   */
  SetinfoData(book_details: Book) {
    this.asin = book_details.ISBN;
    this.edtition = book_details.Publisher;
    this.date = book_details.Published;
    this.title = book_details.Title;
    this.Genre = book_details.Genre;
    this.Ahid[0] = this.book_details[0].AuthorId;
  }
  /**
   *
   * set information of book
   * @memberof BookComponent
   */
  SetBook() {
    this.Image = this.book_details[0].Cover;
    //this.Ahid = this.book_details[0].AuthorId;
    this.title = this.book_details[0].Title;
    this.status = this.book_details[0].ReadStatus;
    this.body = this.book_details[0].Description;
    this.rate = this.book_details[0].BookRating;
  }
}
