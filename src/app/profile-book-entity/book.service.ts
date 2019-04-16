import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListOfBooks } from './book.model';
import { HttpClient } from '@angular/common/http';

/**
 *
 * Injectable
 * @export
 * @class CountBooksService
 */
@Injectable({ providedIn: 'root' })

export class CountBooksService {

  /**
   * Creates an instance of CountBooksService.
   * @param {HttpClient} http
   * @memberof CountBooksService
   */
  constructor(private http: HttpClient)  {}

  /**
   * newNumToRead
   * @memberof CountBooksService
   */
  newNumToRead = 0;

  /**
   *
   * newNumRead
   * @memberof CountBooksService
   */
  newNumRead = 0;

  /**
   * New_num_currnetly reading
   * @memberof CountBooksService
   */
  newNumReading = 0;

  /**
   * to update the num read
   * @private
   * @memberof CountBooksService
   */
  private numReadUpdated = new Subject<number>();

  /**
   *
   * to update the num reading
   * @private
   * @memberof CountBooksService
   */
  private numReadingUpdated = new Subject<number>();

  /**
   *
   * to update the num want to read
   * @private
   * @memberof CountBooksService
   */
  private numWantToReadUpdated = new Subject<number>();

  /**
   *
   *
   * @private
   * @type {ListOfBooks[]}  list of books recieved from the backend
   * @memberof CountBooksService
   */
  private List: ListOfBooks[] = [];
  private listUpdated = new Subject<ListOfBooks[]>();


  /**
   *
   * to get the json response from the mock service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   * @memberof CountBooksService
   */
  get_List_of_books() {
    this.http.get<{ message: string, Books: ListOfBooks[] }>('http://localhost:3000/api/list').
      subscribe((bookData) => {          //  subscribe the list of books recieved
        this.List = bookData.Books;    // assign them to the list to display them
        this.listUpdated.next([...this.List]);
      });

  }

  /**
   *
   * // to display the list of books as observable
   * @returns
   * @memberof CountBooksService
   */
  get_List_of_books_updated() {
    return this.listUpdated.asObservable();
  }



  /*get_count_read(){
      this.http.get<{ message: string, num_read: number }>('http://localhost:3000/api/NumRead').
          subscribe((Data) => {          //  subscribe the no. of books recieved
              this.newNumRead = Data.num_read;    // assign them to the num read to display them

          });
  }*/



  /**
   * to inc number of books read
   * to update the number of books read
   * to send request with the book info
   * to add a book to a read shelf
   * to check that the request sent successfuly
   * @param {ListOfBooks} index the index of the book selected to send as a request
   * @memberof CountBooksService
   */
  add_count_read(index: ListOfBooks) {
    this.newNumRead = this.newNumRead + 1;         // to inc number of books read
    this.numReadUpdated.next(this.newNumRead);     // to update the number of books read
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', index)   // to send request with the book info
      .subscribe(responsedata => {                                    // to add a book to a read shelf
        console.log(responsedata.message);                   // to check that the request sent successfuly
      });
    // console.log(index.book_name);
  }

  /**
   *
   * لإo be observable on update
   * @returns
   * @memberof CountBooksService
   */
  get_count_update_read() {
    return this.numReadUpdated.asObservable();
  }

  /**
   * to inc the number of books want to read
   * to update the number of books want to read
   * @param {ListOfBooks} index index of the book that will be sent
   * @memberof CountBooksService
   */
  add_count_want_to_read(index: ListOfBooks) {
    this.newNumToRead = this.newNumToRead + 1;         // to inc the number of books want to read
    this.numWantToReadUpdated.next(this.newNumToRead);   // to update the number of books want to read
  }

  /**
   *
   * // to be observable on update
   * @returns
   * @memberof CountBooksService
   */
  get_count_update_want_to_read() {
    return this.numWantToReadUpdated.asObservable();
  }


  /**
   * to inc the number of books reading
   * to update the number of books reading
   * @param {ListOfBooks} index index of the book that will be sent
   * @memberof CountBooksService
   */
  add_count_reading(index: ListOfBooks) {
    this.newNumReading = this.newNumReading + 1;            // to inc the number of books reading
    this.numReadingUpdated.next(this.newNumReading);      // to update the number of books reading
  }

  /**
   * to be observable on update
   * @returns
   * @memberof CountBooksService
   */
  get_count_update_reading() {
    return this.numReadingUpdated.asObservable();
  }
}
