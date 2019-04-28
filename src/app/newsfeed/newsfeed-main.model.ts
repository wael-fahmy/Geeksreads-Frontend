/**
 *  Newsfeed post Model
 *  @export
 *  @interface Post
 */
export interface Post {


    /**
     * The status type determines whether it is a review or a comment
     *
     * @memberof Post
     */
    StatusType: string;

    /**
     * status Id
     *
     * @type {string}
     * @memberof Post
     */
    StatusId: string;

    UserId: string;

    CommentId: string;
    CommentBody: string;

    /**
     *  Activity Date
     */
    CommentDate;

    CommentLikesCount: number;

    BookId: string;
    /**
     *  Book Name
     */
    bookName: string;

    /**
     *  Book Image
     */
    BookPhoto: string;

    /**
     *
     * ratings
     * @memberof Post
     */
    numberOfStars;

    ReviewId: string;

    /**
     *  Review
     */
    ReviewBody: string;

    ReviewDate;

    ReviewLikesCount: number;

    MakerId: string;
    /**
     *  Author Name
     */
    MakerPhoto: string;

    MakerName: string;
  }
