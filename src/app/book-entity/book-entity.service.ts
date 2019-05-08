import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookDetails } from './book-entity.model';
import { HttpClient } from '@angular/common/http';
import {ReadStatus} from './book-entity.model';
import { Router } from '@angular/router';

/**
 *
 * service class
 * @export
 * @class BookTitle_Service
 */
@Injectable({ providedIn: 'root' })


export class BookTitle_Service {
    /**
     * Creates an instance of BookTitle_Service.
     * @param {HttpClient} http
     * @param {Router} router
     * @memberof BookTitle_Service
     */
    constructor(private http: HttpClient, private router: Router) { }
    /**
     *
     * variable to carry book details
     * @private
     * @type {BookDetails[]}
     * @memberof BookTitle_Service
     */
    private book_details: BookDetails[] = [];
    /**
     *
     * varaible to carry read status
     * @private
     * @type {ReadStatus}
     * @memberof BookTitle_Service
     */
    private read_status: ReadStatus;
    /**
     *
     * variable to carry read status updated
     * @private
     * @memberof BookTitle_Service
     */
    private read_statusupdated = new Subject<ReadStatus>();
    /**
     *
     * variable to carry book details updated
     * @private
     * @memberof BookTitle_Service
     */
    private book_detailsUpdated = new Subject<BookDetails[]>();
    /**
     *
     * function to get book info
     * @param {string} bookid
     * @memberof BookTitle_Service
     */
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
    /**
     *
     * function to get book info updated
     * @returns
     * @memberof BookTitle_Service
     */
    get_book_Info_updated() {
        return this.book_detailsUpdated.asObservable();
    }
    /**
     *
     * function to remove book from shelf
     * @param {string} bookid
     * @returns
     * @memberof BookTitle_Service
     */
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
    /**
     *
     * function to add book to a shelf
     * @param {string} bookid
     * @param {string} shelf
     * @returns
     * @memberof BookTitle_Service
     */
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
    /**
     *
     * function to add book to reading
     * @param {string} bookid
     * @returns
     * @memberof BookTitle_Service
     */
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
    /**
     *
     * function to add book to read shelf
     * @param {string} bookid
     * @returns
     * @memberof BookTitle_Service
     */
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
/**
 *
 * function to post rate
 * @param {string} bookc_id
 * @param {number} bookc_rate
 * @returns
 * @memberof BookTitle_Service
 */
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
    /**
     *
     * function to get book status
     * @param {string} bookid
     * @memberof BookTitle_Service
     */
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
