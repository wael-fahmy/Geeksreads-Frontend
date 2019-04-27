
/**
 *
 * Profile Model
 * @export
 * @interface User
 */
export interface User {

    /**
     *
     * user id
     * @type {string}
     * @memberof User
     */
    UserId: string;  // user id

    /**
     *
     * user name
     * @type {string}
     * @memberof User
     */
    UserName: string;  // user name

    UserEmail: string;

    OwnedBookId: string [];

    /**
     *
     * user profile photo
     * @type {string}
     * @memberof User
     */
    UserPhoto: string;  // user profile photo
}
