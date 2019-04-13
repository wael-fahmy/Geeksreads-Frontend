import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountBooksService } from '../profile-book-entity/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  num_to_read=0;              // number of books want to read
  num_read=0;                   // number of books read
  num_raeding=0;                  // number of books currently reading
  private Sub : Subscription
  private Sub2 : Subscription
  private Sub3 : Subscription
  private Sub_num : Subscription
constructor(public CountBooksService : CountBooksService ) {}   //class constructor 

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
 

  ngOnDestroy() {
    this.Sub.unsubscribe();                            // unsubscribe sub after finishing 
    this.Sub2.unsubscribe();                            // unsubscribe sub2 after finishing 
    this.Sub3.unsubscribe();                            // unsubscribe sub3 after finishing 
  }

}
