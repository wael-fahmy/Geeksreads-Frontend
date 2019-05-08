/**
 * Author Book Model
 * @export
 * @class AuthorBooksModel
 */
export class AuthorBooksModel {
  /**
   * Author Id
   * @type {string}
   * @memberof AuthorBooksModel
   */
  AuthorId: string;

  /**
   * Book Id
   * @type {string}
   * @memberof AuthorBooksModel
   */
  BookId: string;

  /**
   * Book Rating
   * @memberof AuthorBooksModel
   */
  BookRating;

  /**
   * Book Cover (Image/Photo)
   * @type {string}
   * @memberof AuthorBooksModel
   */
  Cover: string;

  /**
   * Book Description/Details
   * @type {string}
   * @memberof AuthorBooksModel
   */
  Description: string;

  /**
   * Book Genre
   * @type {string}
   * @memberof AuthorBooksModel
   */
  Genre: string;

  /**
   * Book ISBN
   * @type {string}
   * @memberof AuthorBooksModel
   */
  ISBN: string;

  /**
   * Book Pages (Number)
   * @type {number}
   * @memberof AuthorBooksModel
   */
  Pages: number;

  /**
   * Book Published When
   * @type {string}
   * @memberof AuthorBooksModel
   */
  Published: string;

  /**
   * Book Publisher
   * @type {string}
   * @memberof AuthorBooksModel
   */
  Publisher: string;

  /**
   * Book Status/Shelf
   * @type {string}
   * @memberof AuthorBooksModel
   */
  ReadStatus: string;

  /**
   * Book Stores
   * @type {string[]}
   * @memberof AuthorBooksModel
   */
  Store: string[];

  /**
   * Book Title/Name
   * @type {string}
   * @memberof AuthorBooksModel
   */
  Title: string;

  /**
   * MongoDB Id
   * @type {string}
   * @memberof AuthorBooksModel
   */
  _id: string;

}
