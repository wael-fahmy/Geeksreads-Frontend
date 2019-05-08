/**
 *
 * json module
 * @export
 * @interface BookDetails
 */
export interface BookDetails {
    /**
     *
     * variable to carry book id
     * @type {string}
     * @memberof BookDetails
     */
    BookId: string;
    /**
     *
     * variable to carry book title
     * @type {string}
     * @memberof BookDetails
     */
    Title: string;
    /**
     *
     * variable to carry book cover
     * @type {string}
     * @memberof BookDetails
     */
    Cover: string;
    /**
     *
     * variable to carry book body
     * @type {string}
     * @memberof BookDetails
     */
    Description: string;
    /**
     *
     * variable to carry book status
     * @type {string}
     * @memberof BookDetails
     */
    ReadStatus: string;
    /**
     *
     * variable to carry author id
     * @type {string}
     * @memberof BookDetails
     */
    AuthorId: string;
    /**
     *
     * variable to carry rate count
     * @type {number}
     * @memberof BookDetails
     */
    RateCount: number;
    /**
     *
     * variable to carry author name
     * @type {string}
     * @memberof BookDetails
     */
    AuthorName: string;
    /**
     *
     * variable to carry book genre
     * @type {string}
     * @memberof BookDetails
     */
    Genre: string;
    /**
     *
     * variable to carry book isbn
     * @type {string}
     * @memberof BookDetails
     */
    ISBN: string;
    /**
     *
     * variable to carry number of pages
     * @type {number}
     * @memberof BookDetails
     */
    Pages: number;
    /**
     *
     * variable ot carry book published
     * @type {string}
     * @memberof BookDetails
     */
    Published: string;
    /**
     *
     * variable ot carry book publisher
     * @type {string}
     * @memberof BookDetails
     */
    Publisher: string;
    /**
     *
     * varaibel to carry return message
     * @type {string}
     * @memberof BookDetails
     */
    message: string;
    /**
     *
     * varibale to carry boolean return
     * @type {boolean}
     * @memberof BookDetails
     */
    success: boolean;
    /**
     *
     * variable to carry book rating
     * @type {string}
     * @memberof BookDetails
     */
    BookRating: string;
}
/**
 *
 * json module
 * @export
 * @interface AuthorDetails
 */
export interface AuthorDetails {
    /**
     *
     * variable to carry author id
     * @type {string}
     * @memberof AuthorDetails
     */
    AuthorId: string;
    /**
     *
     * variable to carry author name
     * @type {string}
     * @memberof AuthorDetails
     */
    AuthorName: string;
}
/**
 *
 * json module
 * @export
 * @interface ReadStatus
 */
export interface ReadStatus {
    /**
     *
     * variable to carry return message
     * @type {string}
     * @memberof ReadStatus
     */
    ReturnMsg: string;
}
