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

  /**
   *
   * list of books recieved from the backend
   * @private
   * @type {ListOfBooks[]}
   * @memberof CountBooksService
   */
  private List_read: ListOfBooks[] = [];

  /**
   *
   * list of books recieved from the backend
   * @private
   * @type {ListOfBooks[]}
   * @memberof CountBooksService
   */
  private List_wantto_read: ListOfBooks[] = [];
  /**
   * to update the list of books reading
   *
   * @private
   * @memberof CountBooksService
   */
  private listReadingUpdated = new Subject<ListOfBooks[]>();
  /**
   * to update the list of books read
   *
   * @private
   * @memberof CountBooksService
   */
  private listReadUpdated = new Subject<ListOfBooks[]>();

  /**
   *
   * to update the list of books want to read
   * @private
   * @memberof CountBooksService
   */
  private listWanttoReadUpdated = new Subject<ListOfBooks[]>();
  /**
   *
   * to get the json response from the Backend service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   * @memberof CountBooksService
   */
  get_List_of_books_reading() {
    const UserToken = {
      token : localStorage.getItem('token'),
      UserId: localStorage.getItem('userId')
    }
    this.http.post<{ ReadingData: ListOfBooks[] }>('https://geeksreads.herokuapp.com/api/users/GetUserReadingDetails ', UserToken
    ).
      subscribe(bookData => {          //  subscribe the list of books recieved
      //  console.log(bookData.ReadingData);
        this.List_reading = bookData.ReadingData;    // assign them to the list to display them
        this.listReadingUpdated.next([...this.List_reading]);
      }
      , (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * to get the json response from the mock service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   *
   * @memberof CountBooksService
   */
  get_List_of_books_reading_mockup() {
    this.http.get<{message: string , Books: ListOfBooks[] }>('http://localhost:3000/api/users/reading'
    ).
      subscribe(bookData => {          //  subscribe the list of books recieved
        //console.log(bookData.ReadingData);
        this.List_reading = bookData.Books;    // assign them to the list to display them
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
   * to get the json response from the backend service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   * @memberof CountBooksService
   */
  get_List_of_books_read() {

    const UserToken = {
      token : localStorage.getItem('token'),
      UserId: localStorage.getItem('userId')
    }
    //console.log(UserToken);
    this.http.post<{ ReadData: ListOfBooks[] }>('https://geeksreads.herokuapp.com/api/users/GetUserReadDetails', UserToken
    ).
      subscribe(bookData => {          //  subscribe the list of books recieved
        //console.log(bookData.ReadData);
        this.List_read = bookData.ReadData;    // assign them to the list to display them
        this.listReadUpdated.next([...this.List_read]);
      }
      , (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * to get the json response from the mock service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   *
   * @memberof CountBooksService
   */
  get_List_of_books_read_mockup() {
    this.http.get<{message: string , Books: ListOfBooks[] }>('http://localhost:3000/api/users/read'
    ).
      subscribe(bookData => {          //  subscribe the list of books recieved
        //console.log(bookData.Books);
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
   * to get the json response from the backend service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   * @memberof CountBooksService
   */
  get_List_of_books_want_to_read() {
    const UserToken = {
      token : localStorage.getItem('token'),
      UserId: localStorage.getItem('userId')
    }
    this.http.post<{ WantToReadData: ListOfBooks[] }>('https://geeksreads.herokuapp.com/api/users/GetUserWantToReadDetails', UserToken
    ).
      subscribe(bookData => {          //  subscribe the list of books recieved
        //console.log(bookData.WantToReadData);
        this.List_wantto_read = bookData.WantToReadData;    // assign them to the list to display them
        this.listWanttoReadUpdated.next([...this.List_wantto_read]);
      }
      , (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * to get the json response from the mock service and update the book info
   * subscribe the list of books recieved
   * assign them to the list to display them
   *
   * @memberof CountBooksService
   */
  get_List_of_books_to_read_mockup() {
    this.http.get<{message: string , Books: ListOfBooks[] }>('http://localhost:3000/api/users/toread'
    ).
      subscribe(bookData => {          //  subscribe the list of books recieved
        //console.log(bookData.ReadingData);
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
   * to update number of books read and reading
   * to send request with the book id
   * to add a book to a read shelf
   * to check that the request sent successfuly
   * @param {ListOfBooks} index the index of the book selected to send as a request
   * @memberof CountBooksService
   */
  add_book_to_shelf_read(index: ListOfBooks) {
   const bookID = {
     token : localStorage.getItem('token'),
     BookId: index.BookId,
     
   };
   
    this.http
      .post<{ ReturnMsg: string }> ('https://geeksreads.herokuapp.com/api/users/UpdateReadingToRead', bookID)   // to send request with the book info
      .subscribe(responsedata => {                                    // to add a book to a read shelf
        console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
      });
    
  }

  /**
   *  to update number of books  want to read and reading
   * to send request with the book id
   * to add a book to a reading shelf
   * to check that the request sent successfuly
   * @param {ListOfBooks} index index of the book that will be sent
   * @memberof CountBooksService
   */
  add_book_to_shelf_reading(index: ListOfBooks) {
    const bookID = {
      token : localStorage.getItem('token'),
      BookId: index.BookId,
    };
     this.http
       .post <{ ReturnMsg: string }>('https://geeksreads.herokuapp.com/api/users/UpdateWantToReading', bookID)   // to send request with the book info
       .subscribe(responsedata => {                                    // to add a book to a read shelf
         console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
       });
   }


   /**
    * to remove the book from the shelf given the book id
    *
    * @param {ListOfBooks} index
    * @memberof CountBooksService
    */
   Remove_Book(index: ListOfBooks)
   {
    const bookID = {
      token : localStorage.getItem('token'),
      BookId: index.BookId,
    };
     this.http
       .post <{ ReturnMsg: string }>('https://geeksreads.herokuapp.com/api/users/RemoveFromShelf', bookID)   // to send request with the book info
       .subscribe(responsedata => {                                    // to add a book to a read shelf
         console.log(responsedata.ReturnMsg);                   // to check that the request sent successfuly
        });
     
   }

}
