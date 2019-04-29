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
     * The Id of the person made the review or the comment 
     * @type {string}
     * @memberof Post
     */
    MakerId: string;
    /**
     *  Author Name
     */
    MakerPhoto: string;

    /**
     *
     * The photo of the person i am following 
     * @type {string}
     * @memberof Post
     */
    MakerName: string;
  }
