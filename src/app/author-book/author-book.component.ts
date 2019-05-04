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

  /**
   * Book image
   * @type {string}
   * @memberof AuthorBookComponent
   */
  @Input() bookImage: string;

  /**
   * Book name
   * @type {string}
   * @memberof AuthorBookComponent
   */
  @Input() bookName: string;

  /**
   * Book rating
   * @type {string}
   * @memberof AuthorBookComponent
   */
  @Input() bookRating: string;

  /**
   * Book current shelf
   * @type {string}
   * @memberof AuthorBookComponent
   */
  @Input() bookShelfStatus: string;

  /**
   * Book Id
   * @type {string}
   * @memberof AuthorBookComponent
   */
  @Input() bookId: string;

  /**
   *  Author Book Subscription
   *  @private
   *  @type {Subscription}
   *  @memberof AuthorBookComponent
   */
  private authorBookSubscription: Subscription;

  authorId = 12345;
  authorBookId = 12345;
  authorBookName = 'Name of the Book: ' + this.bookName;
  authorBookPicture = 'https://via.placeholder.com/86x120' + this.bookImage;
  authorBookShelf = 'Want to Read';
  authorBookRating = '3.81' + this.bookRating;
  authorBookLink = 'https://www.goodreads.com/';
  authorBookIsInAShelf = false;
  shelfAction = 'Add to Shelf';

  /**
   * Add book to Want to Read Shelf
   * @memberof AuthorBookComponent
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
   * Add book to Currently Reading Shelf
   * @memberof AuthorBookComponent
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
   * Add book to Read Shelf
   * @memberof AuthorBookComponent
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
   * Remove book from currently assigned shelf
   * @memberof AuthorBookComponent
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
