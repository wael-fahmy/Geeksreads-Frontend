import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class Book_Service {
    constructor(private http: HttpClient, private router: Router) { }
    private book_details: Book[] = [];
    private book_detailsUpdated = new Subject<Book[]>();
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
}
