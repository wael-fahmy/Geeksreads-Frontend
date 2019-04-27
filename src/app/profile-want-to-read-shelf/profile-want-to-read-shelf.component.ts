import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListOfBooks } from '../profile-book-entity/book.model';
import { CountBooksService } from '../profile-book-entity/book.service';

@Component({
  selector: 'app-profile-want-to-read-shelf',
  templateUrl: './profile-want-to-read-shelf.component.html',
  styleUrls: ['./profile-want-to-read-shelf.component.css']
})
export class ProfileWantToReadShelfComponent implements OnInit {

  /**
   *
   * To subscribe the list of read books recived from the backend
   * @private
   * @type {Subscription}
   * @memberof ProfileWantToReadShelfComponent
   */
  private subList: Subscription;

  /**
   *
   * List of books currently reading
   * @type {ListOfBooks[]} to store the books read info inside it
   * @memberof ProfileWantToReadShelfComponent
   */
  listOfWantToReadBooks: ListOfBooks[] = [];

  /**
   *  Creates an instance of ProfileWantToReadShelfComponent.
   *  @param {CountBooksService} countBooksService
   *  @memberof ProfileWantToReadShelfComponent
   */
  constructor(public countBooksService: CountBooksService) { } // constructor for this class


  /**
   *
   *  to increment the number of books want to read on click
   * @param {ListOfBooks} index  index of the book to be sent to the backend
   * @memberof ProfileWantToReadShelfComponent
   */
  OnClick_want_read(index: ListOfBooks) {                   // to increment the number of books want to read on click
    this.countBooksService.add_count_want_to_read(index);
    // index.state = 'want to read';
  }


  /**
   *
   * to increment the number of books currently reading on click
   * @param {ListOfBooks} index index of the book to be sent to the backend
   * @memberof ProfileWantToReadShelfComponent
   */
  OnClick_reading(index: ListOfBooks) {                           // to increment the number of books currently reading on click
    this.countBooksService.add_count_reading(index);
    // console.log(index.author_name);
  }

  /**
   *  on initializing that class implement this function
   *  to get the book info from the service
   *  subscribe the recieved data
   *  and put it inside the list of books to display it
   * @memberof ProfileWantToReadShelfComponent
   */
  ngOnInit() {
    this.countBooksService.get_List_of_books();                         // to get the book info from the service
    this.subList = this.countBooksService.get_List_of_books_updated().
      subscribe((List: ListOfBooks[]) => {                              // subscribe the recieved data
        this.listOfWantToReadBooks = List;                                    // and put it inside the list of books to display it
      });
  }
}