/**
 *
 * json interface
 * @export
 * @interface ReviewDetails
 */
export interface ReviewDetails {
    /**
     *
     * variable to carry book id
     * @type {string}
     * @memberof ReviewDetails
     */
    bookId: string;
    /**
     *
     * variable to carry like count
     * @memberof ReviewDetails
     */
    likesCount;
    /**
     *
     * variable to carry user image
     * @type {string}
     * @memberof ReviewDetails
     */
    photo: string;
    /**
     *
     * variable to carry user rating
     * @memberof ReviewDetails
     */
    rating;
    /**
     *
     * variable to carry review body
     * @type {string}
     * @memberof ReviewDetails
     */
    reviewBody: string;
    /**
     *
     * variable to carry review date
     * @memberof ReviewDetails
     */
    reviewDate;
    /**
     *
     * variable to carry review id
     * @type {string}
     * @memberof ReviewDetails
     */
    reviewId: string;
    /**
     *
     * variable to carry shelf
     * @memberof ReviewDetails
     */
    shelf;
    /**
     *
     * variable to carry user id
     * @type {string}
     * @memberof ReviewDetails
     */
    userId: string;
    /**
     *
     * variable to carry user name
     * @type {string}
     * @memberof ReviewDetails
     */
    userName: string;
}
