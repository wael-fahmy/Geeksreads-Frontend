
/**
 * This is the interface of one row of books
 * @export
 * @interface Row
 */
export interface Row {

    /**
     * This is the general genre type e.g:Romance,Fiction..etc
     * @type {string}
     * @memberof Row
     */
    genretype: string ;

    /**
     * book image of the book placed at the left
     * @type {string}
     * @memberof Row
     */
    bookimage1: string ;

    /**
     * book image of the book placed in the middle
     * @type {string}
     * @memberof Row
     */
    bookimage2: string;

    /**
     * book image of the book placed at the right
     * @type {string}
     * @memberof Row
     */
    bookimage3: string;

}
