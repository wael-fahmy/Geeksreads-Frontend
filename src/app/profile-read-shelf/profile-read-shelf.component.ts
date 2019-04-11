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
   

  

   constructor(public CountBooksService : CountBooksService )  {}

   ngOnInit()
   {
   
      this.CountBooksService.get_List_of_books();                    // to get the book info from the service
       this.Sub_list = this.CountBooksService.get_List_of_books_updated().
        subscribe( (List: ListOfBooks[] ) => {
           this.List_of_books_read=List;     
       });   
   }
   

}
