import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ReviewDetails } from './reviews-entity.model';
import { BookDetails } from '../book-entity/book-entity.model';
import { AuthorDetails } from '../book-entity/book-entity.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class ReviewerDetails_Service {
constructor(private http: HttpClient) { }
liked = 1;
private reviewer_details: ReviewDetails[] = [];
private reviewer_detailsUpdated = new Subject<ReviewDetails[]>();
private book_detailsUpdated = new Subject<BookDetails[]>();
private book_details: BookDetails[] = [];
private author_details: AuthorDetails[] = [];
private author_detailsUpdated = new Subject<AuthorDetails[]>();
//https://geeksreads.herokuapp.com
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
get_review_Info_updated() {
        return this.reviewer_detailsUpdated.asObservable();
    }
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

Remove_Book(bookid: string) {
    console.log(bookid);
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
add_book_to_shelf_reading(bookid: string) {
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
add_book_to_shelf_read(bookid: string) {
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
like_review(reviewid: string) {
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
