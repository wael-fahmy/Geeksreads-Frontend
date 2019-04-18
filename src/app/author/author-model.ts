
/**
 * Author Model Class
 * @export
 * @class AuthorModel
 */
export class AuthorModel {
  /**
   *  Author's Id
   */
  authorId: string;

  /**
   *  Name of the author
   */
  authorName: string;

  /**
   *  Link to the author's picture
   */
  authorPicture: string;

  /**
   *  Is the currently signed in user following this author or not
   */
  authorIsFollowing: boolean;

  /**
   *  string of users following this author
   */
  authorstringOfFollowers: string;

  /**
   *  A brief information about the author
   */
  authorDetails: string;

  /**
   * Array of user ids following this author
   * @type {string[]}
   * @memberof AuthorModel
   */
  authorFollowingUserIds: string[];

  /**
   * Books written by this author
   * @type {string[]}
   * @memberof AuthorModel
   */
  authorBookIds: string[];

  /**
   *
   * Number of followers
   * @type {string}
   * @memberof AuthorModel
   */
  authorNumberOfFollowers: string;
}
