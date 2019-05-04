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

    UserEmail: string;
    /**
     *
     * user profile photo
     * @type {string}
     * @memberof User
     */
    Photo: string;  // user profile photo
    NoOfFollowings: number;
    NoOfFollowers: number;
    UserBirthDate: string;
    IsFollowing: string;

}
