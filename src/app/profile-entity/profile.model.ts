
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

    /**
     * user Email
     *
     * @type {string}
     * @memberof User
     */
    UserEmail: string;
    /**
     *
     * user profile photo
     * @type {string}
     * @memberof User
     */
    Photo: string;  // user profile photo

    /**
     *
     * reading books ids
     * @type {string []}
     * @memberof User
     */
    Reading: string [];

    /**
     * want to read books ids
     *
     * @type {string []}
     * @memberof User
     */
    WantToRead: string [];

    /**
     *
     * read books ids
     * @type {string []}
     * @memberof User
     */
    Read: string [];

    /**
     *
     * followers ids
     * @type {string []}
     * @memberof User
     */
    FollowersUserId: string [];

    /**
     *
     * following ids
     * @type {string []}
     * @memberof User
     */
    FollowingUserId: string [];

    /**
     *
     * number of followings
     * @type {number}
     * @memberof User
     */
    NoOfFollowings: number;

    /**
     *
     * number of followers
     * @type {number}
     * @memberof User
     */
    NoOfFollowers: number;

    /**
     *
     * user Birth date
     * @type {string}
     * @memberof User
     */
    UserBirthDate: string;

}
