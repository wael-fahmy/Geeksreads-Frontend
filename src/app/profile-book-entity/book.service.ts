import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import {ListOfBooks} from './book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

export class CountBooksService{
     New_num_to_read=0;
     New_num_read=0;
      
      constructor(private http:HttpClient)  {}


     private List:ListOfBooks[]=[];
     private List_Updated=new Subject <ListOfBooks[]>() 

     private num_read_Updated=new Subject <number>()
     private num_want_to_read_Updated=new Subject <number>()


     get_List_of_books()
     {
        this.http.get<{message:string,Books:ListOfBooks[]}>('http://localhost:3000/api/list').
        subscribe((bookData) => {
            this.List=bookData.Books
          this.List_Updated.next([...this.List]);
        });
        
     }
     get_List_of_books_updated()
    {
        return this.List_Updated.asObservable()
    }
    add_count_read()
    {
       if(this.New_num_read >= 10)
       {
        this.num_read_Updated.complete()
       }
        this.New_num_read=this.New_num_read+1
        this.num_read_Updated.next(this.New_num_read)
    }
   
    get_count_update_read()
    {
        return this.num_read_Updated.asObservable()
    }
   

    add_count_want_to_read()
    {
        if(this.New_num_to_read >= 10)
       {
        this.num_want_to_read_Updated.complete()
       }
        this.New_num_to_read=this.New_num_to_read+1
        this.num_want_to_read_Updated.next(this.New_num_to_read)
    }

    get_count_update_want_to_read()
    {
        return this.num_want_to_read_Updated.asObservable()
    }
    


}