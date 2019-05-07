import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BookDetails } from './book-entity.model';
import { HttpClient } from '@angular/common/http';
import {AuthorDetails} from './book-entity.model';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class BookTitle_Service {
    constructor(private http: HttpClient, private router: Router) { }
    private book_details: BookDetails[] = [];
    private author_details: AuthorDetails[] = [];
    private book_detailsUpdated = new Subject<BookDetails[]>();
    private author_detailsUpdated = new Subject<AuthorDetails[]>();
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
    get_book_Info_updated() {
        return this.book_detailsUpdated.asObservable();
    }
    get_author_Info(authorid: string) {
        this.http.get('https://geeksreads.herokuapp.com/api/authors/id', {
            params: {
            auth_id: authorid,
            }
        }).
            // tslint:disable-next-line:variable-name
            subscribe((authordata: AuthorDetails) => {
                this.author_details[0] = authordata;
                console.log(authordata);
                this.author_detailsUpdated.next([...this.author_details]);
            }, (error: { json: () => void; }) => {
                console.log(error);
            });
    }
    get_author_Info_updated() {
        return this.author_detailsUpdated.asObservable();
    }
// tslint:disable-next-line: variable-name
/**
 *
 * function used to post request of book statue
 * @param {string} bookc_id
 * @param {string} bookc_status
 * @memberof BookTitle_Service
 */
post_book_status(bookc_id: string, bookc_status: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        const UserToken = {
            token : localStorage.getItem('token'),
            BookId: bookc_id,
            ShelfType: 'Read'
        };
        this.http.post<{ ReadingData: BookDetails[] }>('https://geeksreads.herokuapp.com/api/users/AddToShelf', UserToken
    ).
      subscribe(bookData => {          //  subscribe the list of books recieved
        console.log(bookData.ReadingData);
        this.book_details = bookData.ReadingData;    // assign them to the list to display them
        this.book_detailsUpdated.next([...this.book_details]);
    });
    }
    post_book_rate(bookc_id: string, bookc_rate: number) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
        console.log(bookc_id);
        console.log(bookc_rate);
        const UserToken = {
            userId : localStorage.getItem('userId'),
            bookId: bookc_id,
            rating: bookc_rate,
            token: localStorage.getItem('token')
        };
        this.http.post<{ message: string }>('https://geeksreads.herokuapp.com/api/reviews/rate', UserToken).
      subscribe(bookData => {          //  subscribe the list of books recieved
        console.log(bookData.message);   // assign them to the list to display them
        this.book_detailsUpdated.next([...this.book_details]);
    }, (error: { json: () => void; }) => {
        console.log(error);
    });
    }
}
