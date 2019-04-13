import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.css']
})
export class AuthorBookComponent implements OnInit {

  /**
   *  Author's Id
   */
  authorId = 12345;

  /**
   *  Author's Id
   */
  authorBookId = 12345;

  /**
   *  Name of the book
   */
  authorBookName = 'Name of the Book';

  /**
   *  Link to the book's picture
   */
  authorBookPicture = 'https://via.placeholder.com/86x120 ';

  /**
   *  Current shelf assigned to the book
   */
  authorBookShelf = 'Want to Read';

  /**
   *  Book rating
   */
  authorBookRating = 3.81;

  authorBookIsInAShelf = 'false';

  /**
   *  Add book to a shelf
   */
  bookShelf(bookShelf: string) {
    // TODO: Send request
    console.log('Adding this book to + ' + bookShelf);
  }

  /**
   *
   *  Request book's info
   */
  getAuthorBookInfo(authorBookID: string | number) {
    console.log('Component Created ' + authorBookID);
  }


  /**
   *  Adds book to Want to Read Shelf
   */
  wantToRead() {
    // TODO: Send request
    this.authorBookIsInAShelf = 'true';
    console.log('Adding to Want to Read Shelf');
  }

  currentlyReading() {
    // TODO: Send request
    this.authorBookIsInAShelf = 'true';
    console.log('Adding to Reading Shelf');
  }

  read() {
    // TODO: Send request
    this.authorBookIsInAShelf = 'true';
    console.log('Adding to Read Shelf');
  }

  /**
   * Creates an instance of AuthorComponent.
   */
  constructor() { }

  /**
   *  Author component initialization
   */
  ngOnInit() {
    this.getAuthorBookInfo(this.authorBookId);
  }

}
