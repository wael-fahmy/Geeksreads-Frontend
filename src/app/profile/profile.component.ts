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
   *number of books want to read
   * @memberof ProfileComponent
   */
  num_to_read=0;              // number of books want to read

  /**
   *
   * number of books read
   * @memberof ProfileComponent
   */
  num_read=0;                   // number of books read

  /**
   *number of books currently reading
   *
   * @memberof ProfileComponent
   */
  num_raeding=0;                  // number of books currently reading
  /**
   *
   *sub num read
   * @private
   * @type {Subscription}
   * @memberof ProfileComponent
   */
  private Sub : Subscription
  /**
   *
   *sub num to read
   * @private
   * @type {Subscription}
   * @memberof ProfileComponent
   */
  private Sub2 : Subscription

  /**
   *
   *sub num reading
   * @private
   * @type {Subscription}
   * @memberof ProfileComponent
   */
  private Sub3 : Subscription
  private Sub_num : Subscription

/**
 *Creates an instance of ProfileComponent.
 * @param {CountBooksService} CountBooksService
 * @memberof ProfileComponent
 */
constructor(public CountBooksService : CountBooksService ) {}   //class constructor 

/**
 *
 * on initializing that class implement this function 
 * @memberof ProfileComponent
 */
ngOnInit()               // on initializing that class implement this function 
{        

  //this.CountBooksService.get_count_read();
  
  this.Sub = this.CountBooksService.get_count_update_read().      // to observe the update in the number of books read 
  subscribe( (num_read:number) => {                              // once you finished reading
     this.num_read=num_read;
    
 });

 this.Sub2 = this.CountBooksService.get_count_update_want_to_read().   // to observe the update in the number of books 
 subscribe( (num_to_read:number) => {                                  // want to read once you add a book to want to read
    this.num_to_read=num_to_read;
});

this.Sub3 = this.CountBooksService.get_count_update_reading().      // to observe the update in the number of books read 
  subscribe( (num_raeding:number) => {                              // once you finished reading
     this.num_raeding=num_raeding;
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
