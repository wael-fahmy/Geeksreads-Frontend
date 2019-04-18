import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Row } from './genre-row.model';


@Injectable({ providedIn: 'root' })
/**
 * @export
 * @class RowServices
 */
export class RowServices {

    /**
     * Creates an instance of RowServices.
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
     * This function gets the row data from the backend database
     *
     * @memberof RowServices
     */
    get_row() {
        this.http.get<{ message: string , Row: Row }>('http://localhost:3000/api/genres').subscribe((RowData) => {
            this.Row = RowData.Row ;
            this.rowUpdated.next(this.Row);

        });
    }
    /*
    get__books_by_genre(): Observable<any> {
        const param = new HttpParams().set('genrename');
        return this.http.get('http://localhost:3000/api/genres', {parameter: param});
    } 
    */
    

  /**
   * this function is responsible for updating info
   * @returns
   * @memberof RowServices
   */
  get_row_updated() {
      return this.rowUpdated.asObservable() ;
  }
}
