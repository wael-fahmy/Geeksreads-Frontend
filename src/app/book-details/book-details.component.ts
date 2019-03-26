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

  // tslint:disable-next-line:variable-name
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  public book_information: Bookinformation[] = [];
  // tslint:disable-next-line:variable-name
  book_index = 2;
  // tslint:disable-next-line:variable-name
  constructor(public bookinformation_service: BookInformation_Service) { }

  ngOnInit() {
    this.bookinformation_service.get_book_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.bookinformation_service.get_book_Info_updated().subscribe((book_Information: Bookinformation[]) => {
      this.book_information = book_Information;
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }

}
