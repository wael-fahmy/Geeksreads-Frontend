import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthorDetails } from './book-author.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class AuthorDetails_Service {
    /**
     * Creates an instance of AuthorDetails_Service.
     * @param {HttpClient} http
     * @memberof AuthorDetails_Service
     */
    constructor(private http: HttpClient, private router: Router) { }
    name: string;
    image: string;
    id: string;
    body: string;
    bookid: string;
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
                console.log(authordata);
                this.author_details[0] = authordata;
                this.author_detailsUpdated.next([...this.author_details]);
            }, (error: { json: () => void; }) => {
                console.log(error);
            });
    }
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
       /* const author: AuthorDetails = {user_id: userid, AuthorId: authorid, About: null,
            FollowingUserId: null, Photo: null, AuthorName: null, BookId: null};
        this.http.post<{message: string}>('http://localhost:3000/api/authordata', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });*/
    }
    post_author_follow(authorid: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        console.log(localStorage.getItem('userId'));
        /*const author: AuthorDetails = {user_id: userid, AuthorId: authorid, About: null,
            FollowingUserId: null, Photo: null, AuthorName: null, BookId: null};
        this.http.post<{message: string}>('http://localhost:3000/api/authordata', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });*/
        this.http.post('https://geeksreads.herokuapp.com/api/authors/follow', {
        params: {
        myuserId: localStorage.getItem('userId'),
        auth_id: authorid,
        token: localStorage.getItem('token')
        }
    })
    .subscribe((serverResponse: any) => {
        console.log(serverResponse);
        this.author_details[0].message = serverResponse.Message;
        this.author_details[0].success = serverResponse.success;
        this.author_detailsUpdated.next(this.author_details);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
    }
    /**
     *
     * get updated author details
     * @returns
     * @memberof AuthorDetails_Service
     */
    post_author_id(authorid: string) {
        /*const author: AuthorDetails = {user_id: null, AuthorId: authorid, About: null,
            FollowingUserId: null, Photo: null, AuthorName: null, BookId: null};
        this.http.post<{message: string}>('http://localhost:3000/api/authordata', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });*/
    }
}


