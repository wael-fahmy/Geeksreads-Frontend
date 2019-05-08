/**
 *
 * model of json
 * @export
 * @interface BookDetails
 */
export interface BookDetails {
    /**
     *
     * carry book ID
     * @type {string}
     * @memberof BookDetails
     */
    BookId: string;
    /**
     *
     * carry book title
     * @type {string}
     * @memberof BookDetails
     */
    Title: string;
    /**
     *
     * carry book cover photo
     * @type {string}
     * @memberof BookDetails
     */
    Cover: string;
    /**
     *
     * carry book about
     * @type {string}
     * @memberof BookDetails
     */
    Description: string;
    /**
     *
     * carry read status from current user
     * @type {string}
     * @memberof BookDetails
     */
    ReadStatus: string;
    /**
     *
     * carry author ID
     * @type {string}
     * @memberof BookDetails
     */
    AuthorId: string;
    /**
     *
     * carry book rating
     * @memberof BookDetails
     */
    BookRating;
    /**
     *
     * carry author name
     * @type {string}
     * @memberof BookDetails
     */
    AuthorName: string;
    /**
     *
     * carry author Genre
     * @type {string}
     * @memberof BookDetails
     */
    Genre: string;
    /**
     *
     * carry book ASIN
     * @type {string}
     * @memberof BookDetails
     */
    ISBN: string;
    /**
     *
     * carry number of pages
     * @type {number}
     * @memberof BookDetails
     */
    Pages: number;
    /**
     *
     * carry year published
     * @type {string}
     * @memberof BookDetails
     */
    Published: string;
    /**
     *
     * carry data publisher
     * @type {string}
     * @memberof BookDetails
     */
    Publisher: string;
    /**
     *
     * message on success
     * @type {string}
     * @memberof BookDetails
     */
    message: string;
    /**
     *
     * boolean on success
     * @type {boolean}
     * @memberof BookDetails
     */
    success: boolean;
}