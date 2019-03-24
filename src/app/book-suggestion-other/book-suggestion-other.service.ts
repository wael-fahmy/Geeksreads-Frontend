import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {SuggestedBookDetails} from './book-suggestion-other.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})

// tslint:disable-next-line:class-name
export class SuggestedBook_Service {

    constructor(private http: HttpClient)  {}
    // tslint:disable-next-line:variable-name
    private suggestedbook_details: SuggestedBookDetails[] = [];

    // tslint:disable-next-line:variable-name
    private suggestedbook_detailsUpdated = new Subject <SuggestedBookDetails[]>();

    get_suggestedbook_Info() {
       this.http.get<{message: string, suggestedbook_details: SuggestedBookDetails[]}>('http://localhost:3000/api/suggestedbook').
       // tslint:disable-next-line:variable-name
       subscribe((bookdata) => {
           this.suggestedbook_details = bookdata.suggestedbook_details;
           this.suggestedbook_detailsUpdated.next([...this.suggestedbook_details]);
       });
    }
    get_suggestedbook_Info_updated() {
       return this.suggestedbook_detailsUpdated.asObservable();
   }
}
