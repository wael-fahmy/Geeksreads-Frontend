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
/*request_reviewer_like(reviewc_id: string, review_like: string) {
// tslint:disable-next-line: radix
// tslint:disable-next-line: max-line-length
        const review: ReviewDetails = {reviewer_id: reviewc_id, reviewer_likes: review_like, reviewer_body: null,
            reviewer_comments: null, reviewer_date: null, reviewer_image: null, reviewer_name: null, reviewer_rate: null,
            book_read_date: null, book_author: null, book_id: null, book_image: null, book_title: null};
        this.http.post<{message: string}>('http://localhost:3000/api/reviewdata', review)
        .subscribe ((responseData) => {
            console.log(responseData.message);
        });
    }*/
}
