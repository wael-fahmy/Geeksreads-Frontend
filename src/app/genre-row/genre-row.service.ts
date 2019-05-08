import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Row } from './genre-row.model';
import { GenreRowComponent } from './genre-row.component';

/**
 *
 * Injectable
 * @export
 * @class RowServices
 */
@Injectable({ providedIn: 'root' })
export class RowServices {

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
  private Row: Row[] = [];

  /**
   * Row Updated
   * @private
   * @memberof RowServices
   */
  private rowUpdated = new Subject<Row[]>();

  /**
   * This function gets the row info
   * @memberof RowServices
   */
  get_row(genre: string) {
    this.http.get('https://geeksreads.herokuapp.com/api/books/genre', {
      params: {
        Genre: genre,
      }
    }).subscribe((serverResponse: Row[]) => {
      console.log(genre);
      this.Row = serverResponse;
      console.log(this.Row);
      this.rowUpdated.next(this.Row);
    }, (error: { json: () => void; }) => {
      console.log(error);
    });
  }

  /**
   *
   * Gets the row updated info
   * @returns
   * @memberof RowServices
   */
  get_row_updated() {
    return this.rowUpdated.asObservable();
  }
}
