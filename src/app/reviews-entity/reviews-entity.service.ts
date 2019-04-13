import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReviewDetails } from './reviews-entity.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class ReviewerDetails_Service {

    constructor(private http: HttpClient) { }
// tslint:disable-next-line: variable-name
    private reviewer_details: ReviewDetails[] = [];
// tslint:disable-next-line: variable-name
    private reviewer_detailsUpdated = new Subject<ReviewDetails[]>();
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
     * get genre information updated
     * @returns
     * @memberof GenreDetails_Service
     */
    get_review_Info_updated() {
        return this.reviewer_detailsUpdated.asObservable();
    }
}
