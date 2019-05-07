/**
 *
 * interface
 * @export
 * @class BookComponent
 * @implements {OnInit}
 */
export interface Book {
  /**
   *
   * vairable to carry book id
   * @type {string}
   * @memberof Book
   */
  BookId: string;
  /**
   *
   * vairbale to carry book title
   * @type {string}
   * @memberof Book
   */
  Title: string;
  /**
   *
   * vairable to carry book image
   * @type {string}
   * @memberof Book
   */
  Cover: string;
  /**
   *
   * variable to carry book about
   * @type {string}
   * @memberof Book
   */
  Description: string;
  /**
   *
   * variable to carry read status
   * @type {string}
   * @memberof Book
   */
  ReadStatus: string;
  /**
   *
   * vairable to carry author id
   * @type {string}
   * @memberof Book
   */
  AuthorId: string;
  /**
   *
   * variable to carry book rating
   * @memberof Book
   */
  BookRating;
  /**
   *
   * variable to carry author name
   * @type {string}
   * @memberof Book
   */
  AuthorName: string;
  /**
   *
   * variable to carry book genre
   * @type {string}
   * @memberof Book
   */
  Genre: string;
  /**
   *
   * varaible to carry book asin
   * @type {string}
   * @memberof Book
   */
  ISBN: string;
  /**
   *
   * varaible to carry book pages
   * @type {number}
   * @memberof Book
   */
  Pages: number;
  /**
   *
   * variable to carry book publisher
   * @type {string}
   * @memberof Book
   */
  Published: string;
  /**
   *
   * variable to  carry book published
   * @type {string}
   * @memberof Book
   */
  Publisher: string;
  /**
   *
   * variable to carry book message
   * @type {string}
   * @memberof Book
   */
  message: string;
  /**
   *
   * variable to carry success state
   * @type {boolean}
   * @memberof Book
   */
  success: boolean;
}