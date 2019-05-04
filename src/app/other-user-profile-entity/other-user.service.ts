import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { DataSharingService } from '../nav-bar/data-sharing.service';
import {OtherUser} from './other-profile.model';
import {ListOfBooks} from '../profile-book-entity/book.model';
/**
 *
 * Injectable
 * @export
 * @class CountBooksService
 */
@Injectable({ providedIn: 'root' })
export class OtherUserService {

    constructor(private http: HttpClient, private dataSharingService: DataSharingService) { }
     
    User: OtherUser;
    isFollowing: boolean;
    private userUpdated = new Subject<OtherUser>();

    private List_reading: ListOfBooks[] = [];
  private List_read: ListOfBooks[] = [];
  private List_wantto_read: ListOfBooks[] = [];
  private listReadingUpdated = new Subject<ListOfBooks[]>();
  private listReadUpdated = new Subject<ListOfBooks[]>();
  private listWanttoReadUpdated = new Subject<ListOfBooks[]>();

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



    Follow_User(userid: string)
    {
        const UserToken = {
            myuserId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            userId_tobefollowed: userid
           };
          this.http.post<{success: boolean,Message: string}>('https://geeksreads.herokuapp.com/api/users/follow', UserToken
          ).    // get response from this URL
            subscribe((UserData) => {       // subscribe the recived data
              this.isFollowing = UserData.success;       // and put it in the user object to display it
              console.log(this.isFollowing);
            });

    }

    UnFollow_User(userid: string)
    {
        const UserToken = {
            myuserId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            userId_tobefollowed: userid
           };
           console.log(UserToken);
          this.http.post<{success: boolean,Message: string}>('https://geeksreads.herokuapp.com/api/users/unfollow', UserToken
          ).    // get response from this URL
            subscribe((UserData) => {       // subscribe the recived data
              this.isFollowing = UserData.success;       // and put it in the user object to display it
              console.log(this.isFollowing);
            });
    }


    get_List_of_books_reading(userid: string) {
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
      get_List_of_books_reading_updated() {
        return this.listReadingUpdated.asObservable();
      }




}