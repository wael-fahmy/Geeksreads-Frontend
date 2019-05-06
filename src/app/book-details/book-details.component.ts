import { Component, OnInit, Input } from '@angular/core';
import { BookTitle_Service } from './book-details.service';
import { BookDetails } from './book-details.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  /**
   *  Panel open state boolean
   */
  ////////////////////////////////////////
  public panelOpenState: boolean;
  @Input() bookID: string;
  bdition: string [] = [];
  bASIN: string [] = [];
  btitle: string [] = [];
  bpages: string [] = [];
  bpublished: string [] = [];
  private Sub_profile: Subscription;
  public book_details: BookDetails[] = [];
  book_index = 0;
  constructor(public booktitle_service: BookTitle_Service) { }
  ngOnInit() {
    this.booktitle_service.get_book_Info(this.bookID);                            // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      this.SetBookInfor();
      this.CutDate();
    });
  }
  SetBookInfor() {
    this.bdition[this.book_index] = this.book_details[this.book_index].Publisher;
    this.bASIN[this.book_index] = this.book_details[this.book_index].ISBN;
    this.btitle[this.book_index] = this.book_details[this.book_index].Title;
    this.bpages[this.book_index] = this.book_details[this.book_index].Pages.toString();
    this.bpublished[this.book_index] = this.book_details[this.book_index].Published;
  }
  CutDate() {
    const word = this.bpublished[this.book_index].split('T');
    this.bpublished[this.book_index] = word[0];
  }
}
