import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookDetails } from './book-entity.model';
import { HttpClient } from '@angular/common/http';
import {ReadStatus} from './book-entity.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class BookTitle_Service {
    constructor(private http: HttpClient, private router: Router) { }
    private book_details: BookDetails[] = [];
    private read_status: ReadStatus;
    private read_statusupdated = new Subject<ReadStatus>();
    private book_detailsUpdated = new Subject<BookDetails[]>();
    get_book_Info(bookid: string) {
        this.http.get('https://geeksreads.herokuapp.com/api/books/id', { params: {
            book_id: bookid
    }
        }).
            // tslint:disable-next-line:variable-name
            subscribe((bookdata: any) => {
                this.book_details[0] = bookdata;
                this.book_detailsUpdated.next([...this.book_details]);
            }, (error: { json: () => void; }) => {
                console.log(error);
            });
    }
    get_book_Info_updated() {
        return this.book_detailsUpdated.asObservable();
    }
    Remove_Book(bookid: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        console.log(bookid);
        const bookID = {
        token : localStorage.getItem('token'),
        BookId: bookid
        };
        this.http
    // tslint:disable-next-line: max-line-length
        .post <{ ReturnMsg: string }>('https://geeksreads.herokuapp.com/api/users/RemoveFromShelf', bookID)   // to send request with the book info
        .subscribe(responsedata => {                                 // to add a book to a read shelf
        console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
        });
    }
    AddToShelf(bookid: string, shelf: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        if (shelf === 'Want To Read') {
            shelf = 'WantToRead';
        } else if (shelf === 'Currently Reading') {
            shelf = 'Reading';
        }
        console.log(bookid);
        const bookID = {
        token : localStorage.getItem('token'),
        BookId: bookid,
        ShelfType: shelf
        };
        this.http
    // tslint:disable-next-line: max-line-length
        .post <{ ReturnMsg: string }>('https://geeksreads.herokuapp.com/api/users/AddToShelf', bookID)   // to send request with the book info
        .subscribe(responsedata => {                                 // to add a book to a read shelf
        console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
        });
    }
    add_book_to_shelf_reading(bookid: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        const bookID = {
        token : localStorage.getItem('token'),
        BookId: bookid
        };
        this.http
    // tslint:disable-next-line: max-line-length
        .post <{ ReturnMsg: string }>('https://geeksreads.herokuapp.com/api/users/UpdateWantToReading', bookID)   // to send request with the book info
        .subscribe(responsedata => {                                    // to add a book to a read shelf
        console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
        });
    }
    add_book_to_shelf_read(bookid: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        const bookID = {
        token : localStorage.getItem('token'),
        BookId: bookid
        };
        this.http
    // tslint:disable-next-line: max-line-length
        .post<{ ReturnMsg: string }> ('https://geeksreads.herokuapp.com/api/users/UpdateReadingToRead', bookID)   // to send request with the book info
        .subscribe(responsedata => {                                    // to add a book to a read shelf
         console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
        });
    }
// tslint:disable-next-line: variable-name
    post_book_rate(bookc_id: string, bookc_rate: number) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        const UserToken = {
            userId: localStorage.getItem('userId'),
            bookId: bookc_id,
            rating: bookc_rate
        };
        this.http.post<{ message: string }>('https://geeksreads.herokuapp.com/api/reviews/rate', UserToken).
      subscribe(bookData => {          //  subscribe the list of books recieved  // assign them to the list to display them
        this.book_detailsUpdated.next([...this.book_details]);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
    }
    Get_book_status(bookid: string) {
        const UserToken = {
            BookId: bookid,
            token: localStorage.getItem('token')
        };
        this.http.post('https://geeksreads.herokuapp.com/api/users/GetBookReadStatus', UserToken).
     // tslint:disable-next-line:variable-name
    subscribe((read: any) => {
        this.read_status = read;
        this.read_statusupdated.next(this.read_status);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
    }
    get_status_Info_updated() {
        return this.read_statusupdated.asObservable();
    }
}
