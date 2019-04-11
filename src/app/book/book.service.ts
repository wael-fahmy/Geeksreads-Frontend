import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Genredetails } from './book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

// tslint:disable-next-line:class-name
export class GenreDetails_Service {
    /**
     * Creates an instance of GenreDetails_Service.
     * @param {HttpClient} http
     * @memberof GenreDetails_Service
     */
    constructor(private http: HttpClient) { }
    // tslint:disable-next-line:variable-name
    /**
     *
     * carries genre list recieved from json
     * @private
     * @type {Genredetails[]}
     * @memberof GenreDetails_Service
     */
    private genre_details: Genredetails[] = [];

    // tslint:disable-next-line:variable-name
    /**
     *
     * updated genre list information
     * @private
     * @memberof GenreDetails_Service
     */
    private genre_detailsUpdated = new Subject<Genredetails[]>();
    /**
     *
     * get genre information from json
     * @memberof GenreDetails_Service
     */
    get_genre_Info() {
        this.http.get<{ message: string, genre_details: Genredetails[] }>('http://localhost:3000/api/genredetails').
            // tslint:disable-next-line:variable-name
            subscribe((genredata) => {
                this.genre_details = genredata.genre_details;
                this.genre_detailsUpdated.next([...this.genre_details]);
            });
    }
    /**
     *
     * get genre information updated
     * @returns
     * @memberof GenreDetails_Service
     */
    get_genre_Info_updated() {
        return this.genre_detailsUpdated.asObservable();
    }
}
