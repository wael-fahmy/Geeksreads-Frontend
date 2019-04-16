
/**
 *
 * variables used to recieve information from server (json)
 * @export
 */
export interface BookDetails {
    /**
     *
     * variable that carry book id
     * @type {string}
     * @memberof BookDetails
     */
    BookId: string;
    /**
     *
     * Book title : carries the title of the book recieved from server
     * @type {string}
     * @memberof BookDetails
     */
    Title: string;
    /**
     *
     * Book_image: carries the image of the book recieved from server
     * @type {string}
     * @memberof BookDetails
     */
    Cover: string;
    /**
     *
     * book_author: carries the book author name recived from server
     * @type {string}
     * @memberof BookDetails
     */
    Description: string;
    /**
     *
     * variable that carry book status
     * @type {string}
     * @memberof BookDetails
     */
    ReadStatus: string;
    /**
     *
     * variable to carry author ID
     * @type {string}
     * @memberof BookDetails
     */
    AuthorId: string;
    /**
     *
     * variable to carry book rating
     * @type {number}
     * @memberof BookDetails
     */
    BookRating: number;
    /**
     *
     * vairble to carry author name
     * @type {string}
     * @memberof BookDetails
     */
    Author: string;
}
export interface AuthorDetails {
    _id: string;
    AuthorId: string;
    AuthorName: string;
}
