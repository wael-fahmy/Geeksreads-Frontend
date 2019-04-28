import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListOfBooks } from '../profile-book-entity/book.model';
import { CountBooksService } from '../profile-book-entity/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /**
   *
   * number of books want to read
   * @memberof ProfileComponent
   */
  numToRead = 0;              // number of books want to read

  /**
   *
   * number of books read
   * @memberof ProfileComponent
   */
  numRead = 0;                   // number of books read

  /**
   * number of books currently reading
   *
   * @memberof ProfileComponent
   */
  numReading = 0;                  // number of books currently reading
  listOfBooksReading: ListOfBooks[] = [];
  listOfBooksToRead: ListOfBooks[] = [];
  listOfBooksRead: ListOfBooks[] = [];
  /**
   *
   * sub num read
   * @private
   * @type {Subscription}
   * @memberof ProfileComponent
   */
  private Sub: Subscription;
  /**
   *
   * sub num to read
   * @private
   * @type {Subscription}
   * @memberof ProfileComponent
   */
  private Sub2: Subscription;

  /**
   *
   * sub num reading
   * @private
   * @type {Subscription}
   * @memberof ProfileComponent
   */
  private Sub3: Subscription;

  /**
   *
   * sub
   * @private
   * @type {Subscription}
   * @memberof ProfileComponent
   */
  private subNum: Subscription;

  /**
   * Creates an instance of ProfileComponent.
   * @param {CountBooksService} CountBooksService
   * @memberof ProfileComponent
   */
  constructor(public countBooksService: CountBooksService) { }

  /**
   *
   * on initializing that class implement this function
   * @memberof ProfileComponent
   */
  ngOnInit() {
    // this.CountBooksService.get_count_read();

    this.countBooksService.get_List_of_books_read();                    // to get the book info from the service
    this.Sub = this.countBooksService.get_List_of_books_read_updated().
      subscribe((ListRead: ListOfBooks[]) => {                     // subscribe the list of books recived
        this.listOfBooksRead = ListRead;                              // and put it in the list of books to display them
        this.numRead = this.listOfBooksRead.length;
      });

      this.countBooksService.get_List_of_books_want_to_read();                    // to get the book info from the service
      this.Sub2 = this.countBooksService.get_List_of_books_want_to_read_updated().
        subscribe((ListToRead: ListOfBooks[]) => {                     // subscribe the list of books recived
          this.listOfBooksToRead = ListToRead;                              // and put it in the list of books to display them
          this.numToRead = this.listOfBooksToRead.length;
        });

      this.countBooksService.get_List_of_books_reading();                    // to get the book info from the service
      this.Sub3 = this.countBooksService.get_List_of_books_reading_updated().
        subscribe((ListReading: ListOfBooks[]) => {                     // subscribe the list of books recived
          this.listOfBooksReading = ListReading;                              // and put it in the list of books to display them
          this.numReading = this.listOfBooksReading.length;
        });
  }

  /**
   * unsubscribe sub after finishing
   * unsubscribe sub2 after finishing
   * unsubscribe sub3 after finishing
   * @memberof ProfileComponent
   */
  ngOnDestroy() {
    this.Sub.unsubscribe();                            // unsubscribe sub after finishing
    this.Sub2.unsubscribe();                            // unsubscribe sub2 after finishing
    this.Sub3.unsubscribe();                            // unsubscribe sub3 after finishing
  }

}
