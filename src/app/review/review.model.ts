/**
 *
 * interface
 * @export
 * @class BookComponent
 * @implements {OnInit}
 */
export interface Bookreviews {
    /**
     *
     * variable to carry book id
     * @type {string}
     * @memberof Bookreviews
     */
    bookId: string;
    /**
     *
     * vairable to carry like count
     * @memberof Bookreviews
     */
    likesCount;
    /**
     *
     * variable to carry user photo
     * @type {string}
     * @memberof Bookreviews
     */
    photo: string;
    /**
     *
     * variable to carry like condition
     * @type {boolean}
     * @memberof Bookreviews
     */
    liked: boolean;
    /**
     *
     * variable to carry rating
     * @type {number}
     * @memberof Bookreviews
     */
    rating: number;
    /**
     *
     * variable to carry review body
     * @type {string}
     * @memberof Bookreviews
     */
    reviewBody: string;
    /**
     *
     * varibale to carry date
     * @type {string}
     * @memberof Bookreviews
     */
    reviewDate: string;
    /**
     *
     * variable to carry review id
     * @type {string}
     * @memberof Bookreviews
     */
    reviewId: string;
    /**
     *
     * vairable to carry user id
     * @type {string}
     * @memberof Bookreviews
     */
    userId: string;
    /**
     *
     * variable to carry user name
     * @type {string}
     * @memberof Bookreviews
     */
    userName: string;
    /**
     *
     * vairable to carry comment count
     * @memberof Bookreviews
     */
    commCount;
}
