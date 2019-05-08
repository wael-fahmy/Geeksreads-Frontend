import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReviewDetails } from './reviews-entity.model';
import { BookDetails } from '../book-entity/book-entity.model';
import { AuthorDetails } from '../book-entity/book-entity.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 *
 * class for review services
 * @export
 * @class ReviewerDetails_Service
 */
@Injectable({ providedIn: 'root' })


export class ReviewerDetails_Service {
/**
 * Creates an instance of ReviewerDetails_Service.
 * @param {HttpClient} http
 * @param {Router} router
 * @memberof ReviewerDetails_Service
 */
constructor(private http: HttpClient, private router: Router) { }
/**
 *
 * variable to carry review details
 * @private
 * @type {ReviewDetails[]}
 * @memberof ReviewerDetails_Service
 */
private reviewer_details: ReviewDetails[] = [];
/**
 *
 * variable to carry updated review details
 * @private
 * @memberof ReviewerDetails_Service
 */
private reviewer_detailsUpdated = new Subject<ReviewDetails[]>();
/**
 *
 * variable to carry updated book details
 * @private
 * @memberof ReviewerDetails_Service
 */
private book_detailsUpdated = new Subject<BookDetails[]>();
/**
 *
 * variable to carry book details
 * @private
 * @type {BookDetails[]}
 * @memberof ReviewerDetails_Service
 */
private book_details: BookDetails[] = [];
/**
 *
 * function to get review info
 * @param {string} BookID
 * @memberof ReviewerDetails_Service
 */
get_Review_Info(BookID: string) {
    this.http.get('https://geeksreads.herokuapp.com/api/books/reviewbyid',
    { params: {
        book_id: BookID
    }
    }).
    // tslint:disable-next-line:variable-name
    subscribe((reviewdata: any) => {
        this.reviewer_details[0] = reviewdata;
        console.log(this.reviewer_details[0]);
        this.reviewer_detailsUpdated.next([...this.reviewer_details]);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
}
/**
 *
 * function to get review info updated
 * @returns
 * @memberof ReviewerDetails_Service
 */
get_review_Info_updated() {
        return this.reviewer_detailsUpdated.asObservable();
    }
/**
 *
 * function to get book info
 * @param {string} bookid
 * @memberof ReviewerDetails_Service
 */
get_book_Info(bookid: string) {
        this.http.get('https://geeksreads.herokuapp.com/api/books/id', { params: {
            book_id: bookid
    }
        }).
            // tslint:disable-next-line:variable-name
            subscribe((bookdata: any) => {
                this.book_details[0] = bookdata;
                this.book_detailsUpdated.next([...this.book_details]);
            }, (error: { json: () => void; }) => {
                console.log(error);
            });
    }
/**
 *
 * function to get book info updated
 * @returns
 * @memberof ReviewerDetails_Service
 */
get_book_Info_updated() {
        return this.book_detailsUpdated.asObservable();
    }
/**
 *
 * function to remove book from shelf
 * @param {string} bookid
 * @returns
 * @memberof ReviewerDetails_Service
 */
Remove_Book(bookid: string) {
    if (localStorage.getItem('userId') === null) {
        this.router.navigate(['/sign-in']);
        return;
    }
    const bookID = {
    token : localStorage.getItem('token'),
    BookId: bookid
    };
    this.http
// tslint:disable-next-line: max-line-length
    .post <{ ReturnMsg: string }>('https://geeksreads.herokuapp.com/api/users/RemoveFromShelf', bookID)   // to send request with the book info
    .subscribe(responsedata => {
    console.log('removing book');                                  // to add a book to a read shelf
    console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
    });
}
/**
 *
 * functiont to add book to reading shelf
 * @param {string} bookid
 * @returns
 * @memberof ReviewerDetails_Service
 */
add_book_to_shelf_reading(bookid: string) {
    if (localStorage.getItem('userId') === null) {
        this.router.navigate(['/sign-in']);
        return;
    }
    const bookID = {
    token : localStorage.getItem('token'),
    BookId: bookid
    };
    this.http
// tslint:disable-next-line: max-line-length
    .post <{ ReturnMsg: string }>('https://geeksreads.herokuapp.com/api/users/UpdateWantToReading', bookID)   // to send request with the book info
    .subscribe(responsedata => {                                    // to add a book to a read shelf
    console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
    });
}
/**
 *
 * function to add book to read shelf
 * @param {string} bookid
 * @returns
 * @memberof ReviewerDetails_Service
 */
add_book_to_shelf_read(bookid: string) {
    if (localStorage.getItem('userId') === null) {
        this.router.navigate(['/sign-in']);
        return;
    }
    const bookID = {
    token : localStorage.getItem('token'),
    BookId: bookid
    };
    this.http
// tslint:disable-next-line: max-line-length
    .post<{ ReturnMsg: string }> ('https://geeksreads.herokuapp.com/api/users/UpdateReadingToRead', bookID)   // to send request with the book info
    .subscribe(responsedata => {                                    // to add a book to a read shelf
     console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
    });
}
/**
 *
 * function to like review post
 * @param {string} reviewid
 * @returns
 * @memberof ReviewerDetails_Service
 */
like_review(reviewid: string) {
    if (localStorage.getItem('userId') === null) {
        this.router.navigate(['/sign-in']);
        return;
    }
    const Review = {
    token : localStorage.getItem('token'),
    User_Id: localStorage.getItem('userId'),
    resourceId: reviewid,
    Type: 'Review'
    };
    this.http
// tslint:disable-next-line: max-line-length
    .post<{ ReturnMsg: string }> ('https://geeksreads.herokuapp.com/api/resources/like', Review)   // to send request with the book info
    .subscribe(responsedata => {                                    // to add a book to a read shelf
     console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
    });
}
}
