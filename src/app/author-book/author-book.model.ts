
/**
 *  Author Book Model
 *  @export
 *  @interface AuthorBookModel
 */
export interface AuthorBookModel {
  /**
   *  Author's Id
   */
  authorId: number;

  /**
   *  Book's Id
   */
  authorBookId: number;

  /**
   *  Name of the book
   */
  authorBookName: string;

  /**
   *  Link to the book's picture
   */
  authorBookPicture: string;

  /**
   *  Current shelf assigned to the book
   */
  authorBookShelf: string;

  /**
   *  Book rating
   */
  authorBookRating: number;


  /**
   *  Book link
   */
  authorBookLink: string;

  /**
   *  Is this book in a shelf?
   */
  authorBookIsInAShelf: boolean;

  /**
   *  Where is the book now
   */
  shelfAction: string;
}
