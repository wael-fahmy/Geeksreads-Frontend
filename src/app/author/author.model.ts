
/**
 *  Author Model
 *  @export
 *  @interface AuthorModel
 */
export interface AuthorModel {
  /**
   *  Author's Id
   */
  authorId: number;

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
   *  Number of users following this author
   */
  authorNumberOfFollowers: number;

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
}
