import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * Add to shelf service class
 * @export
 * @class AddToShelfService
 */
@Injectable({
  providedIn: 'root'
})
export class AddToShelfService {

  /**
   * Add book to specific shelf
   * @param {*} shelf
   * @param {*} bookId
   * @memberof AddToShelfService
   */
  addToShelf(shelf, bookId) {
    const data = {
      token: localStorage.getItem('token'),
      ShelfType: shelf,
      BookId: bookId,
    };
    this.http
      .post('https://geeksreads.herokuapp.com/api/users/AddToShelf', data)
      .subscribe((serverResponse: any) => {
        console.log(serverResponse);
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * Creates an instance of AddToShelfService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof AddToShelfService
   */
  constructor(private http: HttpClient, private router: Router) { }
}
