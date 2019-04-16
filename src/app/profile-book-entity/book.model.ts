
export interface ListOfBooks {

  /**
   *
   * book id
   * @type {number}
   * @memberof ListOfBooks
   */
  bookId: number;

  /**
   *
   * book name
   * @type {string}
   * @memberof ListOfBooks
   */
  bookName: string;

  /**
   * author name
   *
   * @type {string}
   * @memberof ListOfBooks
   */
  authorName: string;

  /**
   *
   * book cover photo
   * @type {string}
   * @memberof ListOfBooks
   */
  bookCover: string;

  /**
   *
   * book state ( read , want to read , currently reading )
   * @type {string}
   * @memberof ListOfBooks
   */
  state: string;
}
