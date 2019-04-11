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
   
     
   
     List_of_books: ListOfBooks[] = [];
      
   
     
   
      constructor(public CountBooksService : CountBooksService )  {}
   
   OnClick_want_read(index:ListOfBooks){                   // to increment the number of books want to read on click
       this.CountBooksService.add_count_want_to_read(index)  
   }
   
   OnClick_read(index:ListOfBooks){                           // to increment the number of books read on click
       this.CountBooksService.add_count_read(index);
      console.log(index.author_name);
   }

   OnClick_reading(index:ListOfBooks){                           // to increment the number of books currently reading on click
    this.CountBooksService.add_count_reading(index);
   // console.log(index.author_name);
}
     
   ngOnInit()
   {
   
      this.CountBooksService.get_List_of_books();                    // to get the book info from the service
       this.Sub_list = this.CountBooksService.get_List_of_books_updated().
        subscribe( (List: ListOfBooks[] ) => {
           this.List_of_books=List;     
       }); 





   }
   
   
   
     
     
   
   }

