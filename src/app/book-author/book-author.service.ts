import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {AuthorDetails} from './book-author.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

// tslint:disable-next-line:class-name
export class AuthorDetails_Service {

    constructor(private http: HttpClient)  {}
    // tslint:disable-next-line:variable-name
    private author_details: AuthorDetails[] = [];

    // tslint:disable-next-line:variable-name
    private author_detailsUpdated = new Subject <AuthorDetails[]>();

    get_author_Info() {
       this.http.get<{message: string, author_details: AuthorDetails[]}>('http://localhost:3000/api/authordata').
       // tslint:disable-next-line:variable-name
       subscribe((authordata) => {
           this.author_details = authordata.author_details;
           this.author_detailsUpdated.next([...this.author_details]);
       });
    }
    get_author_details_updated() {
       return this.author_detailsUpdated.asObservable();
   }
}


