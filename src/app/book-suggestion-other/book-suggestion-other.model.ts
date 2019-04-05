/**
 *
 * module of the json recieved from server
 * @export
 * @interface SuggestedBookDetails
 */
export interface SuggestedBookDetails {
    /**
     *
     *  variable of the title of the book
     * @type {string}
     * @memberof SuggestedBookDetails
     */
    suggestedbook_title: string;
    /**
     *
     * variable of the image of the book
     * @type {string}
     * @memberof SuggestedBookDetails
     */
    suggestedbook_image: string;
    /**
     *
     * variable of the author of the book
     * @type {string}
     * @memberof SuggestedBookDetails
     */
    suggestedbook_author: string;
}
