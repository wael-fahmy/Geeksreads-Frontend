import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SuggestedBookDetails } from './book-suggestion-other.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class SuggestedBook_Service {
/**
 * Creates an instance of SuggestedBook_Service.
 * @param {HttpClient} http
 * @memberof SuggestedBook_Service
 */
constructor(private http: HttpClient) { }
    // tslint:disable-next-line:variable-name
    /**
     *
     * variable used to carry list of suggested book recieved from server
     * @private
     * @type {SuggestedBookDetails[]}
     * @memberof SuggestedBook_Service
     */
    private suggestedbook_details: SuggestedBookDetails[] = [];

    // tslint:disable-next-line:variable-name
    /**
     *
     * vairbale to carry updated suggested book
     * @private
     * @memberof SuggestedBook_Service
     */
    private suggestedbook_detailsUpdated = new Subject<SuggestedBookDetails[]>();
/**
 *
 * function used to get suggested book list from server
 * @memberof SuggestedBook_Service
 */
get_suggestedbook_Info() {
        this.http.get<{ message: string, suggestedbook_details: SuggestedBookDetails[] }>('http://localhost:3000/api/suggestedbook').
            // tslint:disable-next-line:variable-name
            subscribe((bookdata) => {
                this.suggestedbook_details = bookdata.suggestedbook_details;
                this.suggestedbook_detailsUpdated.next([...this.suggestedbook_details]);
            });
    }
    /**
     *
     * function used to get updated suggested book
     * @returns
     * @memberof SuggestedBook_Service
     */
    get_suggestedbook_Info_updated() {
        return this.suggestedbook_detailsUpdated.asObservable();
    }
// tslint:disable-next-line: variable-name
/**
 *
 * functions uset to post requests of other book suggestions
 * @param {string} book_id
 * @param {string} author_id
 * @memberof SuggestedBook_Service
 */
post_book_wanted(book_id: string, author_id: string) {
// tslint:disable-next-line: max-line-length
        const suggestedbook: SuggestedBookDetails = {suggestedbook_image: null, suggestedbook_title: null, suggestedbook_id: book_id, suggestedbook_author: null, suggestedbook_authorid: author_id};
        this.http.post<{message: string}>('http://localhost:3000/api/suggestedbook', suggestedbook)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }
}
