import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SuggestedAuthorBookDetails } from './book-suggestion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class SuggestedauthorBook_Service {
    /**
     * Creates an instance of SuggestedauthorBook_Service.
     * @param {HttpClient} http
     * @memberof SuggestedauthorBook_Service
     */
    constructor(private http: HttpClient) { }
    // tslint:disable-next-line:variable-name
    /**
     *
     * vairable to carry suggested author book list
     * @private
     * @type {SuggestedAuthorBookDetails[]}
     * @memberof SuggestedauthorBook_Service
     */
    private suggestedauthorbook_details: SuggestedAuthorBookDetails[] = [];

    // tslint:disable-next-line:variable-name
    /**
     *
     * vairable to carry updated author book list
     * @private
     * @memberof SuggestedauthorBook_Service
     */
    private suggestedauthorbook_detailsUpdated = new Subject<SuggestedAuthorBookDetails[]>();
/**
 *
 * function used to recieve data from server
 * @memberof SuggestedauthorBook_Service
 */
get_suggestedauthorbook_Info() {
        // tslint:disable-next-line:max-line-length
        this.http.get<{ message: string, suggestedauthorbook_details: SuggestedAuthorBookDetails[] }>('http://localhost:3000/api/authorbook').
            // tslint:disable-next-line:variable-name
            subscribe((bookdata) => {
                this.suggestedauthorbook_details = bookdata.suggestedauthorbook_details;
                this.suggestedauthorbook_detailsUpdated.next([...this.suggestedauthorbook_details]);
            });
        }
    /**
     *
     * function used to read updata author book data
     * @returns
     * @memberof SuggestedauthorBook_Service
     */
    get_suggestedauthorbook_Info_updated() {
        return this.suggestedauthorbook_detailsUpdated.asObservable();
    }
// tslint:disable-next-line: variable-name
/**
 *
 * function used to post request of suggested book request
 * @param {string} authorbook_id
 * @param {string} author_id
 * @memberof SuggestedauthorBook_Service
 */
post_authorbook_wanted(authorbook_id: string, author_id: string) {
    // tslint:disable-next-line: max-line-length
    const suggestedauthorbook: SuggestedAuthorBookDetails = {suggestedauthorbook_title: null, suggestedauthorbook_image: null, suggestedauthorbook_author: null, suggestedauthorbook_id: authorbook_id, suggestedauthorbook_authorid: author_id};
    this.http.post<{message: string}>('http://localhost:3000/api/authorbook', suggestedauthorbook)
    .subscribe ((responseData) => {
        console.log(responseData.message);
        });
    }
}
