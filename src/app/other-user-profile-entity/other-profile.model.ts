/**
 *
 * Profile Model
 * @export
 * @interface User
 */
export interface OtherUser {

    /**
     *
     * user id
     * @type {string}
     * @memberof User
     */
    UserId: string;
    /**
     *
     * user name
     * @type {string}
     * @memberof User
     */
    UserName: string;  // user name

    /**
     * user email
     *
     * @type {string}
     * @memberof OtherUser
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
     * number of followings
     * @type {number}
     * @memberof OtherUser
     */
    NoOfFollowings: number;

    /**
     *
     * number of followers
     * @type {number}
     * @memberof OtherUser
     */
    NoOfFollowers: number;

    /**
     *
     * user birth date
     * @type {string}
     * @memberof OtherUser
     */
    UserBirthDate: string;

    /**
     * the signed in user is following this user or not
     *
     * @type {string}
     * @memberof OtherUser
     */
    IsFollowing: string;

}
