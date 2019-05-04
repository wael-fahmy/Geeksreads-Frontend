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
  public Image: string;
  public Ahid: string;
  public title: string;
  public status: string;
  public body: string;
  public rate;
  public asin: string;
  public edtition: string;
  public pages: string;
  public date: string;
  public Genre: string;
  constructor(public booktitle_service: Book_Service, private route: ActivatedRoute) { }
  ngOnInit() {
    this.SnapshotParam = this.route.snapshot.paramMap.get('bookid');
    this.booktitle_service.get_book_Info(this.SnapshotParam);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: Book[]) => {
      this.book_details = book_Information;
      this.SetData();
    });
    this.SetData();
  }
  SetData() {
    this.Image = this.book_details[0].Cover;
    this.Ahid = this.book_details[0].AuthorId;
    this.title = this.book_details[0].Title;
    this.status = this.book_details[0].ReadStatus;
    this.body = this.book_details[0].Description;
    this.rate = this.book_details[0].BookRating;
    this.asin = this.book_details[0].ISBN;
    this.edtition = this.book_details[0].Publisher;
    this.pages = this.book_details[0].Pages.toString();
    this.date = this.book_details[0].Published;
    this.Genre = this.book_details[0].Genre;
  }
}
