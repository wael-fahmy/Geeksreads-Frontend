import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { DataSharingService } from '../nav-bar/data-sharing.service';
import {OtherUser} from './other-profile.model';
import {ListOfBooks} from '../profile-book-entity/book.model';
import { Router } from '@angular/router';
/**
 *
 * Injectable
 * @export
 * @class OtherUserService
 */
@Injectable({ providedIn: 'root' })
export class OtherUserService {

    /**
     * class constructor that
     * Creates an instance of OtherUserService.
     * @param {HttpClient} http
     * @param {DataSharingService} dataSharingService
     * @param {Router} router
     * @memberof OtherUserService
     */
    constructor(private http: HttpClient, private dataSharingService: DataSharingService,public router: Router) { }
     
    /**
     *
     * user info to be displayed in the page
     * @type {OtherUser}
     * @memberof OtherUserService
     */
    User: OtherUser;

    /**
     *
     * is the signed in user following this user or not
     * @type {boolean}
     * @memberof OtherUserService
     */
    isFollowing: boolean;

    /**
     *
     * to update the user information when it changes
     * @private
     * @memberof OtherUserService
     */
    private userUpdated = new Subject<OtherUser>();

    /**
     *
     * list of books reading in the reading shelf
     * @private
     * @type {ListOfBooks[]}
     * @memberof OtherUserService
     */
    private List_reading: ListOfBooks[] = [];

  /**
   *
   * list of books read in the read shelf
   * @private
   * @type {ListOfBooks[]}
   * @memberof OtherUserService
   */
  private List_read: ListOfBooks[] = [];

  /**
   *
   * list of books want to read books in the want to read shelf
   * @private
   * @type {ListOfBooks[]}
   * @memberof OtherUserService
   */
  private List_wantto_read: ListOfBooks[] = [];

  /**
   *
   * to update the shelf of reading books
   * @private
   * @memberof OtherUserService
   */
  private listReadingUpdated = new Subject<ListOfBooks[]>();

  /**
   *
   * to update the shelf of read books
   * @private
   * @memberof OtherUserService
   */
  private listReadUpdated = new Subject<ListOfBooks[]>();

  /**
   *
   * to update the shelf of want to read books
   * @private
   * @memberof OtherUserService
   */
  private listWanttoReadUpdated = new Subject<ListOfBooks[]>();



     /**
      * to get the other user info from the backend
      * and subscribe the recived data and put it in the user object to display it
      * @param {string} userid
      * @memberof OtherUserService
      */
     get_other_user_info(userid: string)
     {
        const UserToken = {
            token: localStorage.getItem('token'),
            UserId: userid
           };
          this.http.post('https://geeksreads.herokuapp.com/api/users/GetUserById', UserToken
          ).    // get response from this URL
            subscribe((UserData: OtherUser) => {       // subscribe the recived data
              // console.log(UserData);
              this.User = UserData;       // and put it in the user object to display it
              console.log(this.User);
              this.userUpdated.next(this.User);
            });
        }
       /**
        * to update the user info as observed
        * @returns
        * @memberof TitlesService
        */
       get_User_Info_updated() {            // to update the user info as observed
         return this.userUpdated.asObservable();
       }



    /**
     * to follow this user and Update the number of followers and following
     *
     * @param {string} userid
     * @memberof OtherUserService
     */
    Follow_User(userid: string)
    {
        const UserToken = {
            myuserid: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            userId_tobefollowed: userid
           };
          this.http.post<{success: boolean,Message: string}>('https://geeksreads.herokuapp.com/api/Users/Follow', UserToken
          ).    // get response from this URL
            subscribe((UserData) => {       // subscribe the recived data
              this.isFollowing = UserData.success;       // and put it in the user object to display it
              console.log(this.isFollowing);
            });

    }

    /**
     * to Unfollow this user and Update the number of followers and following
     *
     * @param {string} userid
     * @memberof OtherUserService
     */
    UnFollow_User(userid: string)
    {
      const UserToken = {
        myuserid: localStorage.getItem('userId'),
        token: localStorage.getItem('token'),
        userId_tobefollowed: userid
       };
      this.http.post('https://geeksreads.herokuapp.com/api/Users/unFollow', UserToken
      ).    // get response from this URL
        subscribe((UserData) => {       // subscribe the recived data
          //this.isFollowing = UserData.success;       // and put it in the user object to display it
          //console.log(this.isFollowing);
        }
        , (error: { json: () => void; }) => {
          console.log(error);
        });
    }


    /**
     * to get the list of books reading and put it in the reading shelf
     * subscribe the list of books recieved
     * assign them to the list to display them
     * @param {string} userid
     * @memberof OtherUserService
     */
    get_List_of_books_reading(userid: string) {
      if(userid === localStorage.getItem('userId'))
      {
        this.router.navigate(['/profile']);
      }
       else {
        const UserToken = {
          token : localStorage.getItem('token'),
          UserId: userid
        }
        this.http.post<{ ReadingData: ListOfBooks[] }>('https://geeksreads.herokuapp.com/api/users/GetUserReadingDetails ', UserToken
        ).
          subscribe(bookData => {          //  subscribe the list of books recieved
          //  console.log(bookData.ReadingData);
            this.List_reading = bookData.ReadingData;    // assign them to the list to display them
            this.listReadingUpdated.next([...this.List_reading]);
          }
          , (error: { json: () => void; }) => {
            console.log(error);  
          });
      }

      }

      /**
       *
       * to display the list of books as observable
       * @returns
       * @memberof OtherUserService
       */
      get_List_of_books_reading_updated() {
        return this.listReadingUpdated.asObservable();
      }

      /**
       *
       * to get the list of books read and put it in the read shelf
       * subscribe the list of books recieved
       * assign them to the list to display them
       * @param {string} userid
       * @memberof OtherUserService
       */
      get_List_of_books_read(userid: string) {
        const UserToken = {
          token : localStorage.getItem('token'),
          UserId: userid
        }
        this.http.post<{ ReadData: ListOfBooks[] }>('https://geeksreads.herokuapp.com/api/users/GetUserReadDetails ', UserToken
        ).
          subscribe(bookData => {          //  subscribe the list of books recieved
          //  console.log(bookData.ReadingData);
            this.List_read = bookData.ReadData;    // assign them to the list to display them
            this.listReadUpdated.next([...this.List_read]);
          }
          , (error: { json: () => void; }) => {
            console.log(error);
          });
      }

      /**
       *
       * to display the list of books as observable
       * @returns
       * @memberof OtherUserService
       */
      get_List_of_books_read_updated() {
        return this.listReadUpdated.asObservable();
      }

      /**
       * to get the list of books want to read and put it in the want to read shelf
       * subscribe the list of books recieved
       * assign them to the list to display them
       * @param {string} userid
       * @memberof OtherUserService
       */
      get_List_of_books_want_to_read(userid: string) {
        const UserToken = {
          token : localStorage.getItem('token'),
          UserId: userid
        }
        this.http.post<{ WantToReadData: ListOfBooks[] }>('https://geeksreads.herokuapp.com/api/users/GetUserWantToReadDetails', UserToken
        ).
          subscribe(bookData => {          //  subscribe the list of books recieved
            //console.log(bookData.WantToReadData);
            this.List_wantto_read = bookData.WantToReadData;    // assign them to the list to display them
            this.listWanttoReadUpdated.next([...this.List_wantto_read]);
          }
          , (error: { json: () => void; }) => {
            console.log(error);
          });
      }

      /**
       *
       * // to display the list of books as observable
       * @returns
       * @memberof CountBooksService
       */
      get_List_of_books_want_to_read_updated() {
        return this.listWanttoReadUpdated.asObservable();
      }

}