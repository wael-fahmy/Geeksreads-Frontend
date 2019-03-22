import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {BookDetails} from './book-entity.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

// tslint:disable-next-line:class-name
export class BookTitle_Service {

    constructor(private http: HttpClient)  {}
    // tslint:disable-next-line:variable-name
    private book_details: BookDetails[] = [];

    // tslint:disable-next-line:variable-name
    private book_detailsUpdated = new Subject <BookDetails[]>();

    get_book_Info() {
       this.http.get<{message: string, book_details: BookDetails[]}>('http://localhost:3000/api/book').
       // tslint:disable-next-line:variable-name
       subscribe((bookdata) => {
           this.book_details = bookdata.book_details;
           this.book_detailsUpdated.next([...this.book_details]);
       });
    }
    get_book_Info_updated() {
       return this.book_detailsUpdated.asObservable();
   }
}
