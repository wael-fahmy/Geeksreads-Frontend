/**
 *
 * struct used to carry json recieved
 * @export
 * @interface CommentsDetails
 */
export interface CommentsDetails {
    /**
     *
     * variable used to carry user image
     * @type {string}
     * @memberof CommentsDetails
     */
    user_image: string;
    /**
     *
     * variable used to carry user name
     * @type {string}
     * @memberof CommentsDetails
     */
    userName: string;
    /**
     *
     * variable used to carry user id
     * @type {string}
     * @memberof CommentsDetails
     */
    userId: string;
    /**
     *
     * variable used to carry user body
     * @type {string}
     * @memberof CommentsDetails
     */
    body: string;
    /**
     *
     * variable used to carry user date
     * @type {string}
     * @memberof CommentsDetails
     */
    date: string;
}
export interface user {
    NoOfFollowings: number;
    NoOfFollowers: number;
}
