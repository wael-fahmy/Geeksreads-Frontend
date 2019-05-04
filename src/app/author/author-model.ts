/**
 * Author Model
 * @export
 * @class AuthorModel
 */
export class AuthorModel {
  /**
   * A brief information about the author
   * @type {string}
   * @memberof AuthorModel
   */
  About: string;

  /**
   * Author's Id
   * @type {string}
   * @memberof AuthorModel
   */
  AuthorId: string;

  /**
   * Name of the author
   * @type {string}
   * @memberof AuthorModel
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
   * Link to the author's picture
   * @type {string}
   * @memberof AuthorModel
   */
  Photo: string;

  /**
   * MongoDB Id
   * @type {string}
   * @memberof AuthorModel
   */
  _id: string;
}
