import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Row } from './genre-row.model';

<<<<<<< HEAD

@Injectable({ providedIn: 'root' })
||||||| merged common ancestors
@Injectable({ providedIn: 'root' })
=======
>>>>>>> 442ee150677d96cd935bd5942dd37c2c5ae7631d
/**
 *
 * Injectable
 * @export
 * @class RowServices
 */
@Injectable({ providedIn: 'root' })
export class RowServices {

<<<<<<< HEAD
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
    
||||||| merged common ancestors
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
=======
  /**
   * Creates an instance of RowServices.
   * @param {HttpClient} http
   * @memberof RowServices
   */
  constructor(private http: HttpClient) { }

  /**
   * Row
   * @private
   * @type {Row}
   * @memberof RowServices
   */
  private Row: Row;

  /**
   * Row Updated
   * @private
   * @memberof RowServices
   */
  private rowUpdated = new Subject<Row>();

  /**
   * This function gets the row info
   * @memberof RowServices
   */
  get_row() {
    this.http.get<{ message: string, Row: Row }>('http://localhost:3000/api/genres').subscribe((RowData) => {
      this.Row = RowData.Row;
      this.rowUpdated.next(this.Row);

    });
  }
>>>>>>> 442ee150677d96cd935bd5942dd37c2c5ae7631d

<<<<<<< HEAD
  /**
   * this function is responsible for updating info
   * @returns
   * @memberof RowServices
   */
||||||| merged common ancestors

=======

  /**
   *
   * Gets the row updated info
   * @returns
   * @memberof RowServices
   */
>>>>>>> 442ee150677d96cd935bd5942dd37c2c5ae7631d
  get_row_updated() {
    return this.rowUpdated.asObservable();
  }
}
