export interface Author {
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
}
