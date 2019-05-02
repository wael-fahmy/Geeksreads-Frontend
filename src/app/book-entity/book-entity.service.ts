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
                console.log(bookdata);
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
                console.log(authordata);
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
// tslint:disable-next-line: max-line-length
       /* const book: BookDetails = {BookId: bookc_id, ReadStatus: bookc_status, AuthorId: null,
            Description: null, Cover: null, Title: null, BookRating: null, Author: null, Genre: null,
            ISBN: null, Pages: null, Published: null, Publisher: null};
        this.http.post<{message: string}>('https://geeksreads.herokuapp.com/api/users/AddToShelf', book)//BookId //ShelfType
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });*/
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

post_book_id(bookc_id: string) {
// tslint:disable-next-line: max-line-length
       /* const book: BookDetails = {BookId: bookc_id, ReadStatus: null, AuthorId: null, Description: null
            , Cover: null, Title: null, BookRating: null, Author: null, Genre: null,
            ISBN: null, Pages: null, Published: null, Publisher: null};
        this.http.post<{message: string}>('http://localhost:3000/api/book', book)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });*/
    }
    /*post_getauthor_id(author_id: string) {
        const author: AuthorDetails = {_id: null, AuthorId: author_id, AuthorName: null};
        this.http.post<{message: string}>('http://localhost:3000/api/book', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }
    post_author_id(author_id: string) {
        const author: AuthorDetails = {_id: null, AuthorId: author_id, AuthorName: null};
        this.http.post<{message: string}>('http://localhost:3000/api/book', author)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }*/
}
