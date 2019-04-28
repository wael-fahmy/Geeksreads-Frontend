/**
 *
 * mmodule used to carru json
 * @export
 * @interface Bookreviews
 */
// tslint:disable-next-line: no-empty-interface
export interface Bookreviews {
    /**
     *
     * variable to carry reviewer image
     * @type {string}
     * @memberof Bookreviews
     */
    photo: string;
    /**
     *
     * variable to carry reviewer image
     * @type {string}
     * @memberof Bookreviews
     */
    userName: string;
    /**
     *
     * variable to carry reviewer date
     * @type {string}
     * @memberof Bookreviews
     */
    reviewDate: string;
    /**
     *
     * variable to carry reviewer date
     * @type {string}
     * @memberof Bookreviews
     */
    rating: string;
    /**
     *
     * variable to carry reviewer body
     * @type {string}
     * @memberof Bookreviews
     */
    reviewBody: string;
    /**
     *
     * variable carry number of likes
     * @type {string}
     * @memberof Bookreviews
     */
    likesCount: string;
    /**
     *
     * variable carry number of comments
     * @type {string}
     * @memberof Bookreviews
     */
    reviewer_comments: string;
    /**
     *
     * variable to carry reviewer id
     * @type {string}
     * @memberof Bookreviews
     */
    userId: string;
    reviewId: string;
    liked: boolean;
}
