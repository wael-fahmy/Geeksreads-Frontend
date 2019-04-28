import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ListOfBooks } from './book.model';
import { HttpClient } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';

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
  private List_reading: ListOfBooks[] = [];
  private List_read: ListOfBooks[] = [];
  private List_wantto_read: ListOfBooks[] = [];
  private listReadingUpdated = new Subject<ListOfBooks[]>();
  private listReadUpdated = new Subject<ListOfBooks[]>();
  private listWanttoReadUpdated = new Subject<ListOfBooks[]>();
  /**
   *
   * to get the json response from the mock service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   * @memberof CountBooksService
   */
  get_List_of_books_reading() {
    this.http.get('http://localhost:3000/api/list', {
      params: {
        book_status: 'currently reading',
        User_id : localStorage.getItem('userId') ,   // id of signed in user
      }
    }).
      subscribe((bookData: ListOfBooks[]) => {          //  subscribe the list of books recieved
        this.List_reading = bookData;    // assign them to the list to display them
        this.listReadingUpdated.next([...this.List_reading]);
      });
  }
  /**
   *
   * // to display the list of books as observable
   * @returns
   * @memberof CountBooksService
   */
  get_List_of_books_reading_updated() {
    return this.listReadingUpdated.asObservable();
  }


  /**
   *
   * to get the json response from the mock service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   * @memberof CountBooksService
   */
  get_List_of_books_read() {

      
    this.http.get<{ message: string, Books: ListOfBooks[] }>('http://localhost:3000/api/list', { 
      params: {
        book_status: 'read',
        User_id : localStorage.getItem('userId') ,     // id of signed in user
      }
    }).
      subscribe((bookData) => {          //  subscribe the list of books recieved
        this.List_read = bookData.Books;    // assign them to the list to display them
        this.listReadUpdated.next([...this.List_read]);
      });
  }
  /**
   *
   * // to display the list of books as observable
   * @returns
   * @memberof CountBooksService
   */
  get_List_of_books_read_updated() {
    return this.listReadUpdated.asObservable();
  }


  /**
   *
   * to get the json response from the mock service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   * @memberof CountBooksService
   */
  get_List_of_books_want_to_read() {
    this.http.get<{ message: string, Books: ListOfBooks[] }>('http://localhost:3000/api/list', {
      params: {
        book_status: 'want to read',
        User_id : localStorage.getItem('userId') ,
      }
    }).
      subscribe((bookData) => {          //  subscribe the list of books recieved
        this.List_wantto_read = bookData.Books;    // assign them to the list to display them
        this.listWanttoReadUpdated.next([...this.List_wantto_read]);
      });
  }
  /**
   *
   * // to display the list of books as observable
   * @returns
   * @memberof CountBooksService
   */
  get_List_of_books_want_to_read_updated() {
    return this.listWanttoReadUpdated.asObservable();
  }
  /**
   * to inc number of books read
   * to update the number of books read
   * to send request with the book info
   * to add a book to a read shelf
   * to check that the request sent successfuly
   * @param {ListOfBooks} index the index of the book selected to send as a request
   * @memberof CountBooksService
   */
  add_book_to_shelf_read(index: ListOfBooks) {
    this.newNumRead = this.newNumRead + 1;         // to inc number of books read
    this.numReadUpdated.next(this.newNumRead);     // to update the number of books read
    
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', index)   // to send request with the book info
      .subscribe(responsedata => {                                    // to add a book to a read shelf
       // console.log(responsedata.message);                   // to check that the request sent successfuly
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
  add_book_to_shelf_want_to_read(index: ListOfBooks) {
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
  add_book_to_shelf_reading(index: ListOfBooks) {
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
