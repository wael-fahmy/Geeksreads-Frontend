
/**
 *
 * variables used to recieve information from server (json)
 * @export
 */
export interface BookDetails {
    /**
     *
     * Book title : carries the title of the book recieved from server
     * @type {string}
     * @memberof BookDetails
     */
    book_title: string;
    /**
     *
     * Book_image: carries the image of the book recieved from server
     * @type {string}
     * @memberof BookDetails
     */
    book_image: string;
    /**
     *
     * book_author: carries the book author name recived from server
     * @type {string}
     * @memberof BookDetails
     */
    book_author: string;
    /**
     *
     * book_details: carries book details recieved from server shown part
     * @type {string}
     * @memberof BookDetails
     */
    book_details_shown: string;
    /**
     *
     * book_details_hidden: carries book details recieved from server hidden
     * @type {string}
     * @memberof BookDetails
     */
    book_details_hidden: string;
}
