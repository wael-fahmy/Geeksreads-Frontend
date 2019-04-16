import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookDetails } from './book-entity.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class BookTitle_Service {
    /**
     * Creates an instance of BookTitle_Service.
     * @param {HttpClient} http
     * @memberof BookTitle_Service
     */
    constructor(private http: HttpClient) { }
    // tslint:disable-next-line:variable-name
    /**
     *
     * get an list of book_details model
     * @private
     * @type {BookDetails[]}
     * @memberof BookTitle_Service
     */
    private book_details: BookDetails[] = [];

    // tslint:disable-next-line:variable-name
    /**
     *
     * carries updated details of book details
     * @private
     * @memberof BookTitle_Service
     */
    private book_detailsUpdated = new Subject<BookDetails[]>();
    /**
     *
     * function used to recieve json file from server
     * @memberof BookTitle_Service
     */
    get_book_Info() {
        this.http.get<{ message: string, book_details: BookDetails[] }>('http://localhost:3000/api/book').
            // tslint:disable-next-line:variable-name
            subscribe((bookdata) => {
                this.book_details = bookdata.book_details;
                this.book_detailsUpdated.next([...this.book_details]);
            });
    }
    /**
     *
     * getinfo updated from server
     * @returns
     * @memberof BookTitle_Service
     */
    get_book_Info_updated() {
        return this.book_detailsUpdated.asObservable();
    }
// tslint:disable-next-line: variable-name
/**
 *
 * function used to post request of book statue
 * @param {string} bookc_id
 * @param {string} bookc_status
 * @memberof BookTitle_Service
 */
post_book_status(bookc_id: string, bookc_status: string) {
// tslint:disable-next-line: max-line-length
        const book: BookDetails = {book_id: bookc_id, book_status: bookc_status, book_author: null, book_body: null, book_image: null, book_title: null};
        this.http.post<{message: string}>('http://localhost:3000/api/book', book)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }
}
