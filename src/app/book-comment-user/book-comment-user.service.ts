import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bookreviews } from './book-comment-user.model';
import { HttpClient } from '@angular/common/http';
import { BookDetails } from '../book-entity/book-entity.model';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class Bookreviews_Service {
/**
 *
 * variable used to set likes
 * @memberof Bookreviews_Service
 */
liked = 1;
size: number;
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
        this.http.get('https://geeksreads.herokuapp.com/api/books/reviewbyid',
            { params: {
                book_id: '5c911452bbfd1717b8a7a169'
            }
            }).
            // tslint:disable-next-line:variable-name
            subscribe((reviewdata: Bookreviews) => {
                this.review_information[0] = reviewdata;
                this.review_informationUpdated.next([...this.review_information]);
            }, (error: { json: () => void; }) => {
                console.log(error);
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
// tslint:disable-next-line: variable-name
/**
 *
 * variable used to post request of reviewer comments
 * @param {string} review_id
 * @memberof Bookreviews_Service
 */
request_reviewer_comment(review_id: string) {
// tslint:disable-next-line: max-line-length
// tslint:disable-next-line: object-literal-shorthand
// tslint:disable-next-line: max-line-length
       /* const reviewer_comment: Bookreviews = {reviewer_id: review_id, reviewer_name:null,reviewer_body:null,reviewer_comments:null,reviewer_date:null,reviewer_image:null,reviewer_likes:null,reviewer_rate:null};
        this.http.post<{message: string}>('http://localhost:3000/api/reviewdata', reviewer_comment)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });*/
    }
// tslint:disable-next-line: variable-name
/**
 *
 * function used to post request of review likes
 * @param {string} review_id
 * @param {string} review_like
 * @memberof Bookreviews_Service
 */
request_reviewer_like(review_id: string, review_like: string) {
// tslint:disable-next-line: radix
// tslint:disable-next-line: max-line-length
       /* const reviewer_comment: Bookreviews = {reviewer_id: review_id,
        reviewer_name:null,reviewer_body:null,
        reviewer_comments:null,reviewer_date:null,reviewer_image:null,
        reviewer_likes:review_like,reviewer_rate:null};
        //https://geeksreads.herokuapp.com/api/reviews/getrev
        this.http.post<{message: string}>('http://localhost:3000/api/reviewdata', reviewer_comment)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });*/
    }
}
