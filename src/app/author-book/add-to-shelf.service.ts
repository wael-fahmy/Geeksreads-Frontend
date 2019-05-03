import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddToShelfService {
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

  constructor(private http: HttpClient, private router: Router) { }
}
