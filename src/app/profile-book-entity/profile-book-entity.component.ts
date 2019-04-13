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

          
        
     private Sub_list : Subscription
   
     List_of_books: ListOfBooks[] = [];     // the list of books owned by the user info
    
      constructor(public CountBooksService : CountBooksService )  {}  // the class constructor
   
   OnClick_want_read(index:ListOfBooks){                   // to increment the number of books want to read on click
       this.CountBooksService.add_count_want_to_read(index) ;
   }
   
   OnClick_read(index:ListOfBooks){                           // to increment the number of books read on click
       this.CountBooksService.add_count_read(index);
      // index.state = 'read';
      
   }

   OnClick_reading(index:ListOfBooks){                           // to increment the number of books currently reading on click
    this.CountBooksService.add_count_reading(index);
   // console.log(index.author_name);
}
   ngOnInit()   // on initializing that class implement this function 
   {
   
      this.CountBooksService.get_List_of_books();                    // to get the book info from the service
       this.Sub_list = this.CountBooksService.get_List_of_books_updated().
        subscribe( (List: ListOfBooks[] ) => {                     // subscribe the list of books recived 
           this.List_of_books=List;                              // and put it in the list of books to display them
       }); 

   }
   
   
   
     
     
   
   }

