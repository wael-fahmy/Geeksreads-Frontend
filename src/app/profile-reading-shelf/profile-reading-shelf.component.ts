import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { ListOfBooks } from '../profile-book-entity/book.model';
import { CountBooksService } from '../profile-book-entity/book.service';

@Component({
  selector: 'app-profile-reading-shelf',
  templateUrl: './profile-reading-shelf.component.html',
  styleUrls: ['./profile-reading-shelf.component.css']
})
export class ProfileReadingShelfComponent implements OnInit {

  /**
   *
   * To subscribe the list of read books recived from the backend
   * @private
   * @type {Subscription}
   * @memberof ProfileReadingShelfComponent
   */
  private subList: Subscription;

  /**
   *
   * List of books currently reading
   * @type {ListOfBooks[]} to store the books read info inside it
   * @memberof ProfileReadingShelfComponent
   */
  listOfBooksReading: ListOfBooks[] = [];

  /**
   *
   * to update the list of books in currently reading shelf
   * @private
   * @memberof ProfileReadingShelfComponent
   */
  private listReadingUpdated = new Subject<ListOfBooks[]>();
  /**
   *  Creates an instance of ProfileReadingShelfComponent.
   *  @param {CountBooksService} countBooksService
   *  @memberof ProfileReadingShelfComponent
   */
  constructor(public countBooksService: CountBooksService) { } // constructor for this class


  /**
   *
   * to add the book from currently reading shelf to read on click
   * @param {ListOfBooks} index index of the book to be sent to the backend
   * @memberof ProfileReadingShelfComponent
   */
  OnClick_read(index: ListOfBooks) {                           // to increment the number of books currently reading on click
    this.countBooksService.add_book_to_shelf_read(index);
    this.listReadingUpdated.next([...this.listOfBooksReading]);
    this.listReadingUpdated.asObservable();
  }

  /**
   *
   * to remove the book from the currently reading shelf
   * @param {ListOfBooks} index
   * @memberof ProfileReadingShelfComponent
   */
  OnClick_Remove(index: ListOfBooks){
    this.countBooksService.Remove_Book(index);
  }
  /**
   * to get the book info from the service
   * subscribe the list of books recived
   * and put it in the list of books to display them
   * @memberof ProfileReadingShelfComponent
   */
  get_listReading_observed()
  {
    this.countBooksService.get_List_of_books_reading();                    // to get the book info from the service
    //this.countBooksService.get_List_of_books_reading_mockup();
    this.subList = this.countBooksService.get_List_of_books_reading_updated().
      subscribe((List: ListOfBooks[]) => {                     // subscribe the list of books recived
        this.listOfBooksReading = List;                              // and put it in the list of books to display them
      });
  }
  /**
   *  on initializing that class implement this function
   *  to get the book info from the service
   *  subscribe the recieved data
   *  and put it inside the list of books to display it
   * @memberof ProfileReadingShelfComponent
   */
  ngOnInit() {
    this.get_listReading_observed();
  }
}
