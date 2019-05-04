import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { Subscription } from 'rxjs';
import { Book_Service } from './book.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  SnapshotParam = 'initial value';
  private Sub_profile: Subscription;
  public book_details: Book[] = [];
  Image: string;
  Ahid: string [] = [];
  title: string;
  status: string;
  body: string;
  rate;
  asin: string;
  edtition: string;
  pages: string;
  p: number;
  date: string;
  Genre: string;
  constructor(public booktitle_service: Book_Service, private route: ActivatedRoute) { }
  ngOnInit() {
    this.SnapshotParam = this.route.snapshot.paramMap.get('bookid');
    this.booktitle_service.get_book_Info(this.SnapshotParam);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: Book[]) => {
      this.book_details = book_Information;
      this.SetinfoData(book_Information[0]);
    });
  }
  SetinfoData(book_details: Book) {
    console.log(book_details);
    this.asin = book_details.ISBN;
    this.edtition = book_details.Publisher;
    this.p = book_details.Pages;
    this.pages = this.p.toString();
    this.date = book_details.Published;
    this.title = book_details.Title;
    this.Genre = book_details.Genre;
    this.Ahid[0] = this.book_details[0].AuthorId;
  }
  SetBook() {
    this.Image = this.book_details[0].Cover;
    //this.Ahid = this.book_details[0].AuthorId;
    this.title = this.book_details[0].Title;
    this.status = this.book_details[0].ReadStatus;
    this.body = this.book_details[0].Description;
    this.rate = this.book_details[0].BookRating;
  }
}
