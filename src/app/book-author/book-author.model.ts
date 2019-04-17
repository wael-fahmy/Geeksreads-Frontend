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
    author_name: string;
    /**
     *
     * author image variable
     * @type {string}
     * @memberof AuthorDetails
     */
    author_image: string;
    /**
     *
     * author followers number variable
     * @type {string}
     * @memberof AuthorDetails
     */
    author_followers: string;
    /**
     *
     * shown details of the author
     * @type {string}
     * @memberof AuthorDetails
     */
    author_body: string;
    /**
     *
     * variable to carry author id
     * @type {string}
     * @memberof AuthorDetails
     */
    author_id: string;
    /**
     *
     * variable to book id
     * @type {string}
     * @memberof AuthorDetails
     */
    book_id: string;
    /**
     *
     * variable to carry user id
     * @type {string}
     * @memberof AuthorDetails
     */
    user_id: string;
}
