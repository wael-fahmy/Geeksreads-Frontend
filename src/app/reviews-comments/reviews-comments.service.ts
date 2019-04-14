import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommentsDetails } from './reviews-comments.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class CommentsDetails_Service {
    /**
     * Creates an instance of BookTitle_Service.
     * @param {HttpClient} http
     * @memberof BookTitle_Service
     */
    constructor(private http: HttpClient) { }

// tslint:disable-next-line: variable-name
/**
 *
 * vairable list used to carry comments list
 * @private
 * @type {CommentsDetails[]}
 * @memberof CommentsDetails_Service
 */
private comments_details: CommentsDetails[] = [];

// tslint:disable-next-line: variable-name
/**
 *
 * variable used to get comments updated
 * @private
 * @memberof CommentsDetails_Service
 */
private comments_detailsUpdated = new Subject<CommentsDetails[]>();
/**
 *
 * function used to get request of the comments
 * @memberof CommentsDetails_Service
 */
get_comments_Info() {
        this.http.get<{ message: string, comments_details: CommentsDetails[] }>('http://localhost:3000/api/reviewcomments').
            // tslint:disable-next-line:variable-name
            subscribe((commentsdata) => {
                this.comments_details = commentsdata.comments_details;
                this.comments_detailsUpdated.next([...this.comments_details]);
            });
    }
    /**
     *
     * function used to get updated comments
     * @returns
     * @memberof CommentsDetails_Service
     */
    get_comments_Info_updated() {
        return this.comments_detailsUpdated.asObservable();
    }
}
