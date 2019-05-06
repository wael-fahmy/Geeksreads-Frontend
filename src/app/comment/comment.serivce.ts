import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../profile-entity/profile.model';
/**
 *
 * Injectable
 * @export
 * @class TitlesService
 */
@Injectable({ providedIn: 'root' })


export class TitlesService {

constructor(private http: HttpClient) { }

private User: User;

private userUpdated = new Subject<User>();

get_User_Info(userid: string) {    // give the signed in user id as a parameter
    const UserToken = {
    token: localStorage.getItem('token'),
    UserId: userid
    };
    this.http.post('https://geeksreads.herokuapp.com/api/users/me', UserToken
     ).    // get response from this URL
       subscribe((UserData: User) => {       // subscribe the recived data
        this.User = UserData;       // and put it in the user object to display it
        this.userUpdated.next(this.User);
    });
}
  get_User_Info_updated() {            // to update the user info as observed
    return this.userUpdated.asObservable();
    }
}