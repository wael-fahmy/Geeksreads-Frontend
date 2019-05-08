import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Bookreviews} from './review.model';
import { Injectable } from '@angular/core';
/**
 *
 * main class
 * @export
 * @class ReviewService
 */
@Injectable({ providedIn: 'root' })

export class ReviewService {

/**
 * Creates an instance of ReviewService.
 * @param {HttpClient} http
 * @param {Router} router
 * @memberof ReviewService
 */
constructor(private http: HttpClient, private router: Router) { }

/**
 *
 * function to post like
 * @param {string} ReviewID
 * @returns
 * @memberof ReviewService
 */
post_Like_Review(ReviewID: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
// tslint:disable-next-line: max-line-length
        const UserToken = {
            token: localStorage.getItem('token'),
            User_Id: localStorage.getItem('userId'),
            resourceId: ReviewID,
            Type: 'Review'
        };
        this.http.post<{ message: string}>('https://geeksreads.herokuapp.com/api/resources/like', UserToken).
        subscribe(responseData => {          //  subscribe the list of books recieved
        console.log(responseData);    // assign them to the list to display them
        });
    }
    /**
     *
     * function to post unlike
     * @param {string} ReviewID
     * @returns
     * @memberof ReviewService
     */
    post_UnLike_Review(ReviewID: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
// tslint:disable-next-line: max-line-length
        const UserToken = {
            token: localStorage.getItem('token'),
            User_Id: localStorage.getItem('userId'),
            resourceId: ReviewID,
            Type: 'Review'
        };
        this.http.post<{ message: string}>('https://geeksreads.herokuapp.com/api/resources/unlike', UserToken).
        subscribe(responseData => {          //  subscribe the list of books recieved
        console.log(responseData);    // assign them to the list to display them
        });
    }
}
