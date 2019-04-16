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
