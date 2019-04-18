import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReviewDetails } from './reviews-entity.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class ReviewerDetails_Service {
/**
 * Creates an instance of ReviewerDetails_Service.
 * @param {HttpClient} http
 * @memberof ReviewerDetails_Service
 */
constructor(private http: HttpClient) { }
liked = 1;
// tslint:disable-next-line: variable-name
/**
 *
 * variable list used to carry reviews list
 * @private
 * @type {ReviewDetails[]}
 * @memberof ReviewerDetails_Service
 */
private reviewer_details: ReviewDetails[] = [];
// tslint:disable-next-line: variable-name
/**
 *
 * vairable used to carry list updates
 * @private
 * @memberof ReviewerDetails_Service
 */
private reviewer_detailsUpdated = new Subject<ReviewDetails[]>();
/**
 *
 * fucntion used to get information recieved from server
 * @memberof ReviewerDetails_Service
 */
get_Review_Info() {
        this.http.get<{ message: string, reviewer_details: ReviewDetails[] }>('http://localhost:3000/api/reviewerdata').
            // tslint:disable-next-line:variable-name
            subscribe((reviewdata) => {
                this.reviewer_details = reviewdata.reviewer_details;
                this.reviewer_detailsUpdated.next([...this.reviewer_details]);
            });
    }
    request_reviewer_like(reviewc_id: string, review_like: string) {
// tslint:disable-next-line: radix
// tslint:disable-next-line: max-line-length
        const review: ReviewDetails = {reviewer_id: reviewc_id, reviewer_likes: review_like, reviewer_body: null,
            reviewer_comments: null, reviewer_date: null, reviewer_image: null, reviewer_name: null, reviewer_rate: null,
            book_read_date: null, book_author: null, book_id: null, book_image: null, book_title: null};
        this.http.post<{message: string}>('http://localhost:3000/api/reviewdata', review)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }
    /**
     *
     * function used to get updated reviews
     * @returns
     * @memberof ReviewerDetails_Service
     */
    get_review_Info_updated() {
        return this.reviewer_detailsUpdated.asObservable();
    }
}
