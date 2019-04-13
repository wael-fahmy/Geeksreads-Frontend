
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
    book_body: string;
    /**
     *
     * variable that carry book id
     * @type {string}
     * @memberof BookDetails
     */
    book_id: string;
    /**
     *
     * variable that carry book status
     * @type {string}
     * @memberof BookDetails
     */
    book_status: string;
}
