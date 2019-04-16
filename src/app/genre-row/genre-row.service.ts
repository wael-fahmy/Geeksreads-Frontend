import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Row } from './genre-row.model';

@Injectable({ providedIn: 'root' })
/**
 * @export
 * @class RowServices
 */
export class RowServices {

    /**
     *Creates an instance of RowServices.
     * @param {HttpClient} http
     * @memberof RowServices
     */
    constructor( private http: HttpClient) {}

    /**
     *
     * @private
     * @type {Row}
     * @memberof RowServices
     */
    private Row: Row;

    /**
     *
     * @private
     * @memberof RowServices
     */
    private rowUpdated = new Subject<Row>();

    /**
     *This function gets the row info
     * @memberof RowServices
     */
    get_row() {
        this.http.get<{ message: string , Row: Row }>('http://localhost:3000/api/genres').subscribe((RowData) => {
            this.Row = RowData.Row ;
            this.rowUpdated.next(this.Row);

        });
    }


  get_row_updated() {
      return this.rowUpdated.asObservable() ;
  }
}
