import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Row } from './genre-row.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
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
  constructor(private http: HttpClient, private router: Router) { }

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
      this.Row = serverResponse;
      this.rowUpdated.next(this.Row);
    }, (error: { json: () => void; }) => {
      console.log(error);
      this.router.navigate(['/homepage']);
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
