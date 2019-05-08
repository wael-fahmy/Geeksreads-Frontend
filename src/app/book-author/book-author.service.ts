import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorDetails } from './book-author.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
/**
 *
 * services class for author
 * @export
 * @class AuthorDetails_Service
 */
@Injectable({ providedIn: 'root' })


export class AuthorDetails_Service {
    /**
     * Creates an instance of AuthorDetails_Service.
     * @param {HttpClient} http
     * @param {Router} router
     * @memberof AuthorDetails_Service
     */
    constructor(private http: HttpClient, private router: Router) { }
    /**
     *
     * vairabl to carry author name
     * @type {string}
     * @memberof AuthorDetails_Service
     */
    name: string;
    /**
     *
     * variable to carry author image
     * @type {string}
     * @memberof AuthorDetails_Service
     */
    image: string;
    /**
     *
     * vairbale to carry author id
     * @type {string}
     * @memberof AuthorDetails_Service
     */
    id: string;
    /**
     *
     * variable to carry about author
     * @type {string}
     * @memberof AuthorDetails_Service
     */
    body: string;
    /**
     *
     * vairable to carry book id
     * @type {string}
     * @memberof AuthorDetails_Service
     */
    bookid: string;
    /**
     *
     * vairble to carry number of followers
     * @type {string}
     * @memberof AuthorDetails_Service
     */
    followers: string;
    // tslint:disable-next-line:variable-name
    /**
     *
     * vairbale used to store authors list recieved from server
     * @private
     * @type {AuthorDetails[]}
     * @memberof AuthorDetails_Service
     */
    private author_details: AuthorDetails[] = [];

    // tslint:disable-next-line:variable-name
    /**
     *
     * updated author list
     * @private
     * @memberof AuthorDetails_Service
     */
    private author_detailsUpdated = new Subject<AuthorDetails[]>();
    /**
     *
     * get author details from server
     * @memberof AuthorDetails_Service
     */
    get_author_Info(authorid: string) {
        this.http.get('https://geeksreads.herokuapp.com/api/authors/id', {
            params: {
            auth_id: authorid,
            }
        }).
            // tslint:disable-next-line:variable-name
            subscribe((authordata: AuthorDetails) => {
                this.author_details[0] = authordata;
                this.author_detailsUpdated.next([...this.author_details]);
            }, (error: { json: () => void; }) => {
                console.log(error);
            });
    }
    /**
     *
     * get updated author info
     * @returns
     * @memberof AuthorDetails_Service
     */
    get_author_details_updated() {
        return this.author_detailsUpdated.asObservable();
    }
    /**
     *
     * unfollow post request
     * @param {string} author_id
     * @param {string} user_id
     * @memberof AuthorDetails_Service
     */
    post_author_unfollow(authorid: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        console.log(localStorage.getItem('userId'));
        const UserToken = {
            auth_id: authorid,
            myuserId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
        };
        this.http.post<{ message: string}>('https://geeksreads.herokuapp.com/api/authors/unfollow', UserToken)
    .subscribe((serverResponse: any) => {
        this.author_details[0].message = serverResponse.Message;
        this.author_details[0].success = serverResponse.success;
        this.author_detailsUpdated.next(this.author_details);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
    }
    /**
     *
     * function to follow author
     * @param {string} authorid
     * @returns
     * @memberof AuthorDetails_Service
     */
    post_author_follow(authorid: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        console.log(localStorage.getItem('userId'));
        const UserToken = {
            auth_id: authorid,
            myuserId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
        };
        this.http.post<{ message: string}>('https://geeksreads.herokuapp.com/api/authors/follow', UserToken)
    .subscribe((serverResponse: any) => {
        this.author_details[0].message = serverResponse.Message;
        this.author_details[0].success = serverResponse.success;
        this.author_detailsUpdated.next(this.author_details);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
    }
}


