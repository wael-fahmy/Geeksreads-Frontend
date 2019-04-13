import { Component, OnInit } from '@angular/core';
import { SuggestedAuthorBookDetails } from './book-suggestion.model';
import { Subscription } from 'rxjs';
import { SuggestedauthorBook_Service } from './book-suggestion.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-suggestion',
  templateUrl: './book-suggestion.component.html',
  styleUrls: ['./book-suggestion.component.css']
})
export class BookSuggestionComponent implements OnInit {

  // tslint:disable-next-line:one-variable-per-declaration
  // tslint:disable-next-line:variable-name
  /**
   *
   * subsciption of server
   * @private
   * @type {Subscription}
   * @memberof BookSuggestionComponent
   */
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  /**
   *
   * variable used to carry the recieved suggested books from service.ts
   * @type {SuggestedAuthorBookDetails[]}
   * @memberof BookSuggestionComponent
   */
  public suggestedauthorbook_details: SuggestedAuthorBookDetails[] = [];
  // tslint:disable-next-line:no-shadowed-variable tslint:disable-next-line:variable-name
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of BookSuggestionComponent.
   * @param {SuggestedauthorBook_Service} suggestedauthorsook_service
   * @memberof BookSuggestionComponent
   */
  constructor(public suggestedauthorsook_service: SuggestedauthorBook_Service) { }
  /**
   *
   * function used to read information from services.ts
   * @memberof BookSuggestionComponent
   */
  ngOnInit() {
    // tslint:disable-next-line:max-line-length
    this.suggestedauthorsook_service.get_suggestedauthorbook_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    // tslint:disable-next-line:max-line-length
    this.Sub_profile = this.suggestedauthorsook_service.get_suggestedauthorbook_Info_updated().subscribe((suggestedauthorbookinformation: SuggestedAuthorBookDetails[]) => {
      this.suggestedauthorbook_details = suggestedauthorbookinformation;
      console.log(this.suggestedauthorbook_details[0].suggestedauthorbook_authorid);
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  send_author_book(author: SuggestedAuthorBookDetails) {
    this.suggestedauthorsook_service.post_authorbook_wanted(author.suggestedauthorbook_authorid, author.suggestedauthorbook_id);
  }
}
