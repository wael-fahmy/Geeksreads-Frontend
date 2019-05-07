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
