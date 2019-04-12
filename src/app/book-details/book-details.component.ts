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
  book_index = 0;
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
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }

}
