import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Bookinformation} from './book-details.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

// tslint:disable-next-line:class-name
export class BookInformation_Service {

    constructor(private http: HttpClient)  {}
    // tslint:disable-next-line:variable-name
    private book_information: Bookinformation[] = [];

    // tslint:disable-next-line:variable-name
    private book_informationUpdated = new Subject <Bookinformation[]>();

    get_book_Info() {
       this.http.get<{message: string, book_details: Bookinformation[]}>('http://localhost:3000/api/bookDetails').
       // tslint:disable-next-line:variable-name
       subscribe((bookdata) => {
           this.book_information = bookdata.book_details;
           this.book_informationUpdated.next([...this.book_information]);
       });
    }
    get_book_Info_updated() {
       return this.book_informationUpdated.asObservable();
   }
}
