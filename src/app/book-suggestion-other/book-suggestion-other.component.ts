import { Component, OnInit } from '@angular/core';
import { SuggestedBookDetails } from './book-suggestion-other.model';
import { Subscription } from 'rxjs';
import { SuggestedBook_Service } from './book-suggestion-other.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-suggestion-other',
  templateUrl: './book-suggestion-other.component.html',
  styleUrls: ['./book-suggestion-other.component.css']
})
export class BookSuggestionOtherComponent implements OnInit {

  // tslint:disable-next-line:one-variable-per-declaration
  // tslint:disable-next-line:variable-name
  /**
   *
   * subscription of the server
   * @private
   * @type {Subscription}
   * @memberof BookSuggestionOtherComponent
   */
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  /**
   *
   * variable used to carru suggested books from services.ts
   * @type {SuggestedBookDetails[]}
   * @memberof BookSuggestionOtherComponent
   */
  public suggestedbook_details: SuggestedBookDetails[] = [];
  // tslint:disable-next-line:no-shadowed-variable tslint:disable-next-line:variable-name
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of BookSuggestionOtherComponent.
   * @param {SuggestedBook_Service} suggestedbook_service
   * @memberof BookSuggestionOtherComponent
   */
  constructor(public suggestedbook_service: SuggestedBook_Service) { }
  /**
   *
   * function used to read suggested book from services.ts
   * @memberof BookSuggestionOtherComponent
   */
  ngOnInit() {
    this.suggestedbook_service.get_suggestedbook_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:max-line-length
    this.Sub_profile = this.suggestedbook_service.get_suggestedbook_Info_updated().subscribe((suggestedbookinformation: SuggestedBookDetails[]) => {
      this.suggestedbook_details = suggestedbookinformation;
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  OnClick_getbook(index: SuggestedBookDetails) {
    this.suggestedbook_service.post_book_wanted(index.suggestedbook_id, index.suggestedbook_author);
  }

}
