import { Component, OnInit, OnDestroy } from '@angular/core';
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

    this.Sub = this.countBooksService.get_count_update_read().      // to observe the update in the number of books read
      subscribe((numRead: number) => {                              // once you finished reading
        this.numRead = numRead;

      });

    this.Sub2 = this.countBooksService.get_count_update_want_to_read().   // to observe the update in the number of books
      subscribe((numToRead: number) => {                                  // want to read once you add a book to want to read
        this.numToRead = numToRead;
      });

    this.Sub3 = this.countBooksService.get_count_update_reading().      // to observe the update in the number of books read
      subscribe((numReading: number) => {                              // once you finished reading
        this.numReading = numReading;
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
