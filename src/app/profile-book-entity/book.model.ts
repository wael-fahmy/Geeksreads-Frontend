
export interface ListOfBooks{
    
    /**
     *
     *book id
     * @type {number}
     * @memberof ListOfBooks
     */
    book_id:number;          /**
    *
    *book name
    * @type {string}
    * @memberof ListOfBooks
    */     
    book_name:string;             
    /**
     *author name
     *
     * @type {string}
     * @memberof ListOfBooks
     */
    author_name:string;

    /**
     *
     *book cover photo 
     * @type {string}
     * @memberof ListOfBooks
     */
    book_cover:string; 

    /**
     *
     *book state ( read , want to read , currently reading )
     * @type {string}
     * @memberof ListOfBooks
     */
    state:string;  
}              