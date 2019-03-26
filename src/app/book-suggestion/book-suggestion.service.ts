import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SuggestedAuthorBookDetails } from './book-suggestion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class SuggestedauthorBook_Service {

    constructor(private http: HttpClient) { }
    // tslint:disable-next-line:variable-name
    private suggestedauthorbook_details: SuggestedAuthorBookDetails[] = [];

    // tslint:disable-next-line:variable-name
    private suggestedauthorbook_detailsUpdated = new Subject<SuggestedAuthorBookDetails[]>();

    get_suggestedauthorbook_Info() {
        // tslint:disable-next-line:max-line-length
        this.http.get<{ message: string, suggestedauthorbook_details: SuggestedAuthorBookDetails[] }>('http://localhost:3000/api/authorbook').
            // tslint:disable-next-line:variable-name
            subscribe((bookdata) => {
                this.suggestedauthorbook_details = bookdata.suggestedauthorbook_details;
                this.suggestedauthorbook_detailsUpdated.next([...this.suggestedauthorbook_details]);
            });
    }
    get_suggestedauthorbook_Info_updated() {
        return this.suggestedauthorbook_detailsUpdated.asObservable();
    }
}
