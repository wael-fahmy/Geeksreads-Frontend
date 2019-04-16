import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorDetails } from './book-author.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class AuthorDetails_Service {
    /**
     * Creates an instance of AuthorDetails_Service.
     * @param {HttpClient} http
     * @memberof AuthorDetails_Service
     */
    constructor(private http: HttpClient) { }
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
    get_author_Info() {
        this.http.get<{ message: string, author_details: AuthorDetails[] }>('http://localhost:3000/api/authordata').
            // tslint:disable-next-line:variable-name
            subscribe((authordata) => {
                this.author_details = authordata.author_details;
                this.author_detailsUpdated.next([...this.author_details]);
            });
    }
    /**
     *
     * get updated author details
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
    post_author_unfollow(authorid: string, userid: string) {
        const author: AuthorDetails = {user_id: userid, author_id: authorid, author_body: null,
            author_followers: null, author_image: null, author_name: null, book_id: null};
        this.http.post<{message: string}>('http://localhost:3000/api/authordata', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }
    post_author_follow(authorid: string, userid: string) {
        const author: AuthorDetails = {user_id: userid, author_id: authorid, author_body: null,
            author_followers: null, author_image: null, author_name: null, book_id: null};
        this.http.post<{message: string}>('http://localhost:3000/api/authordata', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }
    post_author_id(authorid: string) {
        const author: AuthorDetails = {user_id: null, author_id: authorid, author_body: null,
            author_followers: null, author_image: null, author_name: null, book_id: null};
        this.http.post<{message: string}>('http://localhost:3000/api/authordata', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }
}


