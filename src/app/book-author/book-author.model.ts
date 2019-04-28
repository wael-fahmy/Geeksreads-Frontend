/**
 *
 * json details module to recieve from server
 * @export
 * @interface AuthorDetails
 */
export interface AuthorDetails {
    /**
     *
     * author name variable
     * @type {string}
     * @memberof AuthorDetails
     */
    AuthorName: string;
    /**
     *
     * author image variable
     * @type {string}
     * @memberof AuthorDetails
     */
    Photo: string;
    /**
     *
     * author followers number variable
     * @type {string}
     * @memberof AuthorDetails
     */
    FollowingUserId: string [];
    /**
     *
     * shown details of the author
     * @type {string}
     * @memberof AuthorDetails
     */
    About: string;
    /**
     *
     * variable to carry author id
     * @type {string}
     * @memberof AuthorDetails
     */
    AuthorId: string;
    /**
     *
     * variable to book id
     * @type {string}
     * @memberof AuthorDetails
     */
    BookId: string;
    /**
     *
     * variable to carry user id
     * @type {string}
     * @memberof AuthorDetails
     */
    user_id: string;
    message: string;
    success: boolean;
}
