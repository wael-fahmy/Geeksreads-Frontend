import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs'
import {ListOfBooks} from '../profile-book-entity/book.model';
import{CountBooksService}from '../profile-book-entity/book.service'
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
@Component({
  selector: 'app-profile-read-shelf',
  templateUrl: './profile-read-shelf.component.html',
  styleUrls: ['./profile-read-shelf.component.css']
})
export class ProfileReadShelfComponent implements OnInit {
  private Sub_list : Subscription
  List_of_books_read: ListOfBooks[] = [];
   constructor(public CountBooksService : CountBooksService )  {} // constructor for this class

   ngOnInit()                  // on initializing that class implement this function 
   {
      this.CountBooksService.get_List_of_books();                    // to get the book info from the service
       this.Sub_list = this.CountBooksService.get_List_of_books_updated().
        subscribe( (List: ListOfBooks[] ) => {           // subscribe the recieved data
           this.List_of_books_read=List;                  // and put it inside the list of books to display it 
       });
   }
  
}
