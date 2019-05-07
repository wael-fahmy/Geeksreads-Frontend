import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bookreviews } from './book-comment-user.model';
import { HttpClient } from '@angular/common/http';
import { BookDetails } from '../book-entity/book-entity.model';
import { Router } from '@angular/router';

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
    constructor(private http: HttpClient, private router: Router) { }
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
    get_review_Info(BookID: string) {
        this.http.get('https://geeksreads.herokuapp.com/api/reviews/getrev',
            { params: {
                bookId: BookID,
                UserId: localStorage.getItem('userId')
            }
            }).
            // tslint:disable-next-line:variable-name
            subscribe((reviewdata: Bookreviews[]) => {
                this.review_information = reviewdata;
                console.log(reviewdata);
                this.review_informationUpdated.next([...this.review_information]);
            }, (error: { json: () => void; }) => {
                console.log(error);
            });
    }
    get_review_Info_updated() {
        return this.review_informationUpdated.asObservable();
    }
    post_book_review(bookc_id: string, reviewbody: string, reviewdate: string, Rrating: number) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        const UserToken = {
            userId : localStorage.getItem('userId'),
            bookId: bookc_id,
            rating: Rrating,
            reviewBody: reviewbody,
            reviewDate: reviewdate,
            token: localStorage.getItem('token')
        };
        this.http.post<{ message: string }>('https://geeksreads.herokuapp.com/api/reviews/add', UserToken).
      subscribe(bookData => {          //  subscribe the list of books recieved
        console.log(bookData);   // assign them to the list to display them
        this.review_informationUpdated.next([...this.review_information]);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
    }
}
