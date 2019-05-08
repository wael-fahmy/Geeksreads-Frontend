import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookDetails } from './book-details.model';
import { HttpClient } from '@angular/common/http';

/**
 *
 * clasee to carry services
 * @export
 * @class BookTitle_Service
 */
@Injectable({ providedIn: 'root' })


export class BookTitle_Service {
    /**
     * Creates an instance of BookTitle_Service.
     * @param {HttpClient} http
     * @memberof BookTitle_Service
     */
    constructor(private http: HttpClient) { }
    /**
     *
     * carry book details recieved
     * @private
     * @type {BookDetails[]}
     * @memberof BookTitle_Service
     */
    private book_details: BookDetails[] = [];
    /**
     *
     * update current upon recieving
     * @private
     * @memberof BookTitle_Service
     */
    private book_detailsUpdated = new Subject<BookDetails[]>();
    /**
     *
     * function to get book details
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
     * function to get updated list
     * @returns
     * @memberof BookTitle_Service
     */
    get_book_Info_updated() {
        return this.book_detailsUpdated.asObservable();
    }
}
