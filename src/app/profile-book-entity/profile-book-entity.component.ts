import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'
import { ListOfBooks } from './book.model';
import { CountBooksService } from './book.service'


@Component({
    selector: 'app-profile-book-entity',
    templateUrl: './profile-book-entity.component.html',
    styleUrls: ['./profile-book-entity.component.css']
})
export class ProfileBookEntityComponent implements OnInit {

    
     /**
      *
      *
      * @private to subscribe the list of books recieved
      * @type {Subscription}
      * @memberof ProfileBookEntityComponent
      */
     private Sub_list : Subscription
   
     /**
      *
      * // the list of books owned by the user info
      * @type {ListOfBooks[]}
      * @memberof ProfileBookEntityComponent
      */
     List_of_books: ListOfBooks[] = [];    
    
      /**
       *Creates an instance of ProfileBookEntityComponent. 
       * @param {CountBooksService} CountBooksService
       * @memberof ProfileBookEntityComponent
       */
      constructor(public CountBooksService : CountBooksService )  {}  
   
   /**
    *
    * // to increment the number of books want to read on click
    * @param {ListOfBooks} index   index of the book selected
    * @memberof ProfileBookEntityComponent
    */
   OnClick_want_read(index:ListOfBooks){                  
       this.CountBooksService.add_count_want_to_read(index) ;
   }
   
   /**
    *
    * // to increment the number of books read on click
    * @param {ListOfBooks} index   index of the book selected
    * @memberof ProfileBookEntityComponent
    */
   OnClick_read(index:ListOfBooks){             
       this.CountBooksService.add_count_read(index);
      // index.state = 'read';
      
   }

   /**
    *
    *  // to increment the number of books currently reading on click
    * @param {ListOfBooks} index  index of the book selected
    * @memberof ProfileBookEntityComponent
    */
   OnClick_reading(index:ListOfBooks){                         
    this.CountBooksService.add_count_reading(index);
   // console.log(index.author_name);
}

   /**
    * on initializing that class implement this function 
    * to get the book info from the service
    * subscribe the list of books recived 
    * and put it in the list of books to display them
    * @memberof ProfileBookEntityComponent
    */
   ngOnInit()   
   {
   
      this.CountBooksService.get_List_of_books();                    // to get the book info from the service
       this.Sub_list = this.CountBooksService.get_List_of_books_updated().
        subscribe( (List: ListOfBooks[] ) => {                     // subscribe the list of books recived 
           this.List_of_books=List;                              // and put it in the list of books to display them
       }); 

   }
   }

