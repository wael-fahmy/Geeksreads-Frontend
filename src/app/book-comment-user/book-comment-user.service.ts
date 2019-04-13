import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bookreviews } from './book-comment-user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class Bookreviews_Service {

    /**
     * Creates an instance of Bookreviews_Service.
     * @param {HttpClient} http
     * @memberof Bookreviews_Service
     */
    constructor(private http: HttpClient) { }
    // tslint:disable-next-line:variable-name
    /**
     *
     * recieve reviews information from json
     * @private
     * @type {Bookreviews[]}
     * @memberof Bookreviews_Service
     */
    private review_information: Bookreviews[] = [];

    // tslint:disable-next-line:variable-name

    /**
     *
     * updated information variable
     * @private
     * @memberof Bookreviews_Service
     */
    private review_informationUpdated = new Subject<Bookreviews[]>();
    /**
     *
     * get review information from json
     * @memberof Bookreviews_Service
     */
    get_review_Info() {
        this.http.get<{ message: string, review_details: Bookreviews[] }>('http://localhost:3000/api/reviewdata').
            // tslint:disable-next-line:variable-name
            subscribe((reviewdata) => {
                this.review_information = reviewdata.review_details;
                this.review_informationUpdated.next([...this.review_information]);
            });
    }
   /**
    *
    * get review information to update
    * @returns
    * @memberof Bookreviews_Service
    */
   get_review_Info_updated() {
        return this.review_informationUpdated.asObservable();
    }
}
