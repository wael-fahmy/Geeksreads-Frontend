import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListOfBooks } from './book.model';
import { CountBooksService } from './book.service';

/**
 *
 * Profile book entity component
 * @export
 * @class ProfileBookEntityComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile-book-entity',
  templateUrl: './profile-book-entity.component.html',
  styleUrls: ['./profile-book-entity.component.css']
})
export class ProfileBookEntityComponent implements OnInit {

  /**
   *
   * To subscribe the list of books recieved
   * @private
   * @type {Subscription}
   * @memberof ProfileBookEntityComponent
   */
  private subList: Subscription;

  /**
   *
   * The list of books owned by the user info
   * @type {ListOfBooks[]}
   * @memberof ProfileBookEntityComponent
   */
  listOfBooks: ListOfBooks[] = [];
  
  /**
   * Creates an instance of ProfileBookEntityComponent.
   * @param {CountBooksService} CountBooksService
   * @memberof ProfileBookEntityComponent
   */
  constructor(public countBooksService: CountBooksService) { }

  /**
   * on initializing that class implement this function
   * to get the book info from the service
   * subscribe the list of books recived
   * and put it in the list of books to display them
   * @memberof ProfileBookEntityComponent
   */
  ngOnInit() {

    this.countBooksService.get_List_of_books_reading();                    // to get the book info from the service
    this.subList = this.countBooksService.get_List_of_books_reading_updated().
      subscribe((List: ListOfBooks[]) => {                     // subscribe the list of books recived
        this.listOfBooks = List;                              // and put it in the list of books to display them
        
      });

  }
}
