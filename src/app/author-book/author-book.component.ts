import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AddToShelfService } from './add-to-shelf.service';
/**
 *  Author Book Component
 *  @export
 *  @class AuthorBookComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-author-book',
  templateUrl: './author-book.component.html',
  styleUrls: ['./author-book.component.css']
})
export class AuthorBookComponent implements OnInit {
  @Input() bookImage: string;
  @Input() bookName: string;
  @Input() bookRating: string;
  @Input() bookShelfStatus: string;
  @Input() bookId: string;
  /**
   *  Author Book Subscription
   *  @private
   *  @type {Subscription}
   *  @memberof AuthorBookComponent
   */
  private authorBookSubscription: Subscription;

  /**
   *  Author's Id
   *  @memberof AuthorBookComponent
   */
  authorId = 12345;

  /**
   *  Book's Id
   *  @memberof AuthorBookComponent
   */
  authorBookId = 12345;

  /**
   *  Name of the book
   *  @memberof AuthorBookComponent
   */
  authorBookName = 'Name of the Book: ' + this.bookName;

  /**
   *  Link to the book's picture
   *  @memberof AuthorBookComponent
   */
  authorBookPicture = 'https://via.placeholder.com/86x120' + this.bookImage;

  /**
   *  Current shelf assigned to the book
   *  @memberof AuthorBookComponent
   */
  authorBookShelf = 'Want to Read';

  /**
   *  Book rating
   *  @memberof AuthorBookComponent
   */
  authorBookRating = '3.81' + this.bookRating;

  /**
   *  Book link
   *  @memberof AuthorBookComponent
   */
  authorBookLink = 'https://www.goodreads.com/';

  /**
   *  Is this book in a shelf?
   *  @memberof AuthorBookComponent
   */
  authorBookIsInAShelf = false;

  /**
   *  Where is the book now
   *  @memberof AuthorBookComponent
   */
  shelfAction = 'Add to Shelf';

  /**
   *  Adds book to Want to Read Shelf
   */
  wantToRead() {
    this.addToShelfService.addToShelf('Want to read', this.bookId);
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
    this.addToShelfService.addToShelf('Currently Reading', this.bookId);
    this.authorBookIsInAShelf = true;
    this.shelfAction = 'Currently Reading';
    document.getElementById('author-book-shelf-button').style.backgroundColor = '#f2f2f2';
    document.getElementById('author-book-shelf-button').style.color = '#000000';
    console.log('Adding to Currently Reading Shelf');
  }

  /**
   *  Adds book to Read Shelf
   */
  read() {
    this.addToShelfService.addToShelf('Read', this.bookId);
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
    this.addToShelfService.addToShelf('', this.bookId);
    this.authorBookIsInAShelf = false;
    this.shelfAction = 'Add to Shelf';
    document.getElementById('author-book-shelf-button').style.backgroundColor = '#409D69';
    document.getElementById('author-book-shelf-button').style.color = '#ffffff';
    console.log('Removing from shelves');
  }


  /**
   *  Creates an instance of AuthorBookComponent.
   *  @param {AuthorBookService} authorBookService
   *  @memberof AuthorBookComponent
   */
  constructor(private addToShelfService: AddToShelfService) { }

  /**
   *  Author component initialization
   *  @memberof AuthorBookComponent
   */
  ngOnInit() {
  }
}
