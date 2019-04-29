export class AuthorModel {
  /**
   *  A brief information about the author
   */
  About: string;

  /**
   *  Author's Id
   */
  AuthorId: string;

  /**
   *  Name of the author
   */
  AuthorName: string;

  /**
   * Books written by this author
   * @type {string[]}
   * @memberof AuthorModel
   */
  BookId: string[];

  /**
   * Array of user ids following this author
   * @type {string[]}
   * @memberof AuthorModel
   */
  FollowingUserId: string[];

  /**
   *  Link to the author's picture
   */
  Photo: string;

  // tslint:disable-next-line:variable-name
  _id: string;
}
