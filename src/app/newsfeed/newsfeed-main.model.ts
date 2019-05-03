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

    /**
     * The Id of the account owner
     *
     * @type {string}
     * @memberof Post
     */
    UserId: string;


    /**
     *
     * The number of the comment made by the person followed by the account user
     * @type {string}
     * @memberof Post
     */
    CommentId: string;


    /**
     *
     * The comment body
     * @type {string}
     * @memberof Post
     */
    CommentBody: string;

    /**
     *  Activity Date
     */
    CommentDate: Date;


    /**
     *
     * The number of the comments and likes made
     * @type {number}
     * @memberof Post
     */
    CommentLikesCount: number;


    /**
     *
     * The book id
     * @type {string}
     * @memberof Post
     */
    BookId: string;
    /**
     *  Book Name
     */
    BookName: string;

    /**
     *  Book Image
     */
    BookPhoto: string;

    /**
     *
     * ratings
     * @memberof Post
     */
    NumberOfStars;


    /**
     *
     * The Id of the review
     * @type {string}
     * @memberof Post
     */
    ReviewId: string;

    /**
     *  Review body
     */
    ReviewBody: string;


    /**
     *
     * Review date
     * @memberof Post
     */
    ReviewDate;


    /**
     *
     * The number of the Reviews made by the follwer
     * @type {number}
     * @memberof Post
     */
    ReviewLikesCount: number;

    /**
     *
     * The Id of the person i am following who made a review
     * @type {string}
     * @memberof Post
     */
    ReviewMakerId: string;

    /**
     *
     * The Photo of the person i am following who made a review
     * @type {string}
     * @memberof Post
     */
    ReviewMakerPhoto: string;


    /**
     *
     * The name of the person i am following who made a review
     * @type {string}
     * @memberof Post
     */
    ReviewMakerName: string;


    /**
     *
     * The id of the person i am following who made a comment
     * @type {string}
     * @memberof Post
     */
    CommentMakerId: string;


    /**
     *
     *The photo of the person i am following who made a comment
     * @type {string}
     * @memberof Post
     */
    CommentMakerPhoto: string;


    /**
     *
     *The name of the person i am following who made a comment
     * @type {string}
     * @memberof Post
     */
    CommentMakerName: string;

}
