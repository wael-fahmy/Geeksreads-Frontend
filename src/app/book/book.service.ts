import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 *
 * service class
 * @export
 * @class Book_Service
 */
@Injectable({ providedIn: 'root' })


export class Book_Service {
    /**
     * Creates an instance of Book_Service.
     * @param {HttpClient} http
     * @param {Router} router
     * @memberof Book_Service
     */
    constructor(private http: HttpClient, private router: Router) { }
    /**
     *
     * variable to carry book details
     * @private
     * @type {Book[]}
     * @memberof Book_Service
     */
    private book_details: Book[] = [];
    /**
     *
     * variable to carry book updated
     * @private
     * @memberof Book_Service
     */
    private book_detailsUpdated = new Subject<Book[]>();
    /**
     *
     * function to get book info
     * @param {string} bookid
     * @memberof Book_Service
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
     * @memberof Book_Service
     */
    get_book_Info_updated() {
        return this.book_detailsUpdated.asObservable();
    }
}
