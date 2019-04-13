import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListOfBooks } from './book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class CountBooksService{
     New_num_to_read=0;
     New_num_read=0;
     New_num_reading=0;
      
      constructor(private http:HttpClient)  {}



     private num_read_Updated=new Subject <number>();
     private num_reading_Updated=new Subject <number>();
     private num_want_to_read_Updated=new Subject <number>();

    private List: ListOfBooks[] = [];
    private List_Updated = new Subject<ListOfBooks[]>()

    
    get_List_of_books()           //  to get the json response from the mock service and update the book info
    {
        this.http.get<{ message: string, Books: ListOfBooks[] }>('http://localhost:3000/api/list').
            subscribe((bookData) => {          //  subscribe the list of books recieved 
                this.List = bookData.Books;    // assign them to the list to display them 
                this.List_Updated.next([...this.List]);
            });

    }
    get_List_of_books_updated() {             // to display the list of books as observable 
        return this.List_Updated.asObservable()
    }



    /*get_count_read(){
        this.http.get<{ message: string, num_read: number }>('http://localhost:3000/api/NumRead').
            subscribe((Data) => {          //  subscribe the no. of books recieved 
                this.New_num_read = Data.num_read;    // assign them to the num read to display them 
               
            });
    }*/


    
    add_count_read(index:ListOfBooks)
    {
        this.New_num_read = this.New_num_read + 1;         // to inc number of books read 
        this.num_read_Updated.next(this.New_num_read);     // to update the number of books read 
        this.http
        .post<{message: string}>("http://localhost:3000/api/posts", index)   // to send request with the book info
        .subscribe(responsedata =>{                                    // to add a book to a read shelf
            console.log(responsedata.message);                   // to check that the request sent successfuly
        });

           //console.log(index.book_name);
    }

    get_count_update_read()        // to be observable on update
    {
        return this.num_read_Updated.asObservable()
    }

   
 
    add_count_want_to_read(index:ListOfBooks)            
    {
        this.New_num_to_read = this.New_num_to_read + 1;         // to inc the number of books want to read
        this.num_want_to_read_Updated.next(this.New_num_to_read);   // to update the number of books want to read 
    }

    get_count_update_want_to_read()          // to be observable on update
    {
        return this.num_want_to_read_Updated.asObservable()
    }


    add_count_reading(index:ListOfBooks)             
    {
        
        this.New_num_reading= this.New_num_reading + 1;           // to inc the number of books reading
        this.num_reading_Updated.next(this.New_num_reading);     // to update the number of books reading
    }

    get_count_update_reading()          // to be observable on update
    {
        return this.num_reading_Updated.asObservable()
    }
    


}