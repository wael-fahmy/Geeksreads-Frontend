import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PARAMETERS } from '@angular/core/src/util/decorators';
import { DataSharingService } from '../nav-bar/data-sharing.service';
import {OtherUser} from './other-profile.model';
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
    private userUpdated = new Subject<OtherUser>();

     get_other_user_info(userid: string)
     {
        const UserToken = {
            token: localStorage.getItem('token'),
            UserID: userid
           };
          this.http.post('https://geeksreads.herokuapp.com/api/users/me', UserToken
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



    Follow_User()
    {


    }

}