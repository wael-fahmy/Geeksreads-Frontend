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


  /**
   *  Is this book in a shelf?
   */
  authorBookIsInAShelf = false;


  /**
   *  Where is the book now
   */
  shelfAction = 'Add to Shelf';

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
    this.authorBookIsInAShelf = true;
    this.shelfAction = 'Want to Read';
    document.getElementById('author-book-shelf-button').style.backgroundColor = '#f2f2f2';
    document.getElementById('author-book-shelf-button').style.color = '#000000';
    console.log('Adding to Want to Read Shelf');
  }

  /**
   *  Adds book to Currently Reading Shelf
   */
  currentlyReading() {
    // TODO: Send request
    this.authorBookIsInAShelf = true;
    this.shelfAction = 'Currently Reading';
    document.getElementById('author-book-shelf-button').style.backgroundColor = '#f2f2f2';
    document.getElementById('author-book-shelf-button').style.color = '#000000';
    console.log('Adding to Reading Shelf');
  }

  /**
   *  Adds book to Read Shelf
   */
  read() {
    // TODO: Send request
    this.authorBookIsInAShelf = true;
    this.shelfAction = 'Read';
    document.getElementById('author-book-shelf-button').style.backgroundColor = '#f2f2f2';
    document.getElementById('author-book-shelf-button').style.color = '#000000';
    console.log('Adding to Read Shelf');
  }

  /**
   *  Removes book from its current shelf
   */
  removeFromShelf() {
    // TODO: Send request
    this.authorBookIsInAShelf = false;
    this.shelfAction = 'Add to Shelf';
    document.getElementById('author-book-shelf-button').style.backgroundColor = '#409D69';
    document.getElementById('author-book-shelf-button').style.color = '#ffffff';
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
