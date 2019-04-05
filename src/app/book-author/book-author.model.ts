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
    author_details_shown: string;
    /**
     *
     * hidden details of the author
     * @type {string}
     * @memberof AuthorDetails
     */
    author_details_hidden: string;
}
