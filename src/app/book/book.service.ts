import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GenreDetails } from './book.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class GenreDetailsService {
    /**
     * Creates an instance of GenreDetails_Service.
     * @param {HttpClient} http
     * @memberof GenreDetails_Service
     */
    constructor(private http: HttpClient) { }

    /**
     *
     * carries genre list recieved from json
     * @private
     * @type {Genredetails[]}
     * @memberof GenreDetails_Service
     */
    private genreDetails: GenreDetails[] = [];

    // tslint:disable-next-line:variable-name
    /**
     *
     * updated genre list information
     * @private
     * @memberof GenreDetails_Service
     */
    private genreDetailsUpdated = new Subject<GenreDetails[]>();
    /**
     *
     * get genre information from json
     * @memberof GenreDetails_Service
     */
    get_genre_Info() {
        this.http.get<{ message: string, genreDetails: GenreDetails[] }>('http://localhost:3000/api/genredetails').
            // tslint:disable-next-line:variable-name
            subscribe((genredata) => {
                this.genreDetails = genredata.genreDetails;
                this.genreDetailsUpdated.next([...this.genreDetails]);
            });
    }
    /**
     *
     * get genre information updated
     * @returns
     * @memberof GenreDetails_Service
     */
    get_genre_Info_updated() {
        return this.genreDetailsUpdated.asObservable();
    }
}
