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
    /*List_of_books_info=[
       {book_name : " Harry Potter ", author_name : " J.R.R ", book_cover: "https://orig05.deviantart.net/e78f/f/2008/160/f/a/harry_potter_by_jonathan3333.jpg"},
       {book_name : " Game of Thrones ", author_name : " G.R.R Martin ", book_cover:"https://orig05.deviantart.net/e78f/f/2008/160/f/a/harry_potter_by_jonathan3333.jpg"},
       {book_name : " Pirates  ", author_name : " M.Tony " , book_cover: "https://tse2.mm.bing.net/th?id=OIP.FN55nUOxccDTpCPhYOmVfgHaLU&pid=15.1&P=0&w=300&h=300"}
     ]   // gowaha el book_name wel author ;*/

    private Sub_list: Subscription



    List_of_books: ListOfBooks[] = [];


    state = 'currently reading';

    constructor(public CountBooksService: CountBooksService) { }

    OnClick_want_read() {                   // to increment the number of books want to read on click
        this.CountBooksService.add_count_want_to_read()
    }

    OnClick_read() {                           // to increment the number of books read on click
        this.CountBooksService.add_count_read();
    }

    ngOnInit() {

        this.CountBooksService.get_List_of_books();                    // to get the book info from the service
        this.Sub_list = this.CountBooksService.get_List_of_books_updated().
            subscribe((List: ListOfBooks[]) => {
                this.List_of_books = List;

            });
    }






}