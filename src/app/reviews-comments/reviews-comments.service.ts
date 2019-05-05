import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommentsDetails } from './reviews-comments.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class CommentsDetails_Service {
    /**
     * Creates an instance of BookTitle_Service.
     * @param {HttpClient} http
     * @memberof BookTitle_Service
     */
    constructor(private http: HttpClient, private router: Router) { }

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
get_comments_Info(ReviewID: string) {
        this.http.get('https://geeksreads.herokuapp.com/api/comments/list',
        { params: {
            ReviewId: ReviewID
        }
            }).
            // tslint:disable-next-line:variable-name
            subscribe((commentsdata: any) => {
                this.comments_details = commentsdata;
                console.log(this.comments_details);
                this.comments_detailsUpdated.next([...this.comments_details]);
            }, (error: { json: () => void; }) => {
                console.log(error);
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
    post_Comment(body: string, ReviewID: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
// tslint:disable-next-line: max-line-length
        const UserToken = {
            Body: body,
            ReviewId: ReviewID,
            BookId: localStorage.getItem('bookID'),
            userId: localStorage.getItem('userId'),
            Photo: 'https://cdn.shopify.com/s/files/1/0078/6563/0831/products/TogaPrint_grande.png?v=1552807118',
            token: localStorage.getItem('token'),
            LikesCount: '0',
            date: '2000-01-01T00:00:00.000Z'
        };
        console.log(localStorage.getItem('token'));
        this.http.post<{ message: string}>('https://geeksreads.herokuapp.com/api/comments/add', UserToken).
        subscribe(responseData => {          //  subscribe the list of books recieved
        console.log(responseData);    // assign them to the list to display them
        this.comments_detailsUpdated.next([...this.comments_details]);
        });
    }
}
