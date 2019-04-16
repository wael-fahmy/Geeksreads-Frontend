import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './profile.model';
import { HttpClient } from '@angular/common/http';

/**
 *
 * Injectable
 * @export
 * @class TitlesService
 */
@Injectable({ providedIn: 'root' })


export class TitlesService {
  /**
   * Creates an instance of TitlesService.
   * @param {HttpClient} http
   * @memberof TitlesService
   */
  constructor(private http: HttpClient) { }

  /**
   * User data member to put user info inside
   * @private
   * @type {User}
   * @memberof TitlesService
   */
  private User: User;

  /**
   * to update the user info on demand
   *
   * @private
   * @memberof TitlesService
   */
  private userUpdated = new Subject<User>();

  /**
   *
   * to get the json response from the mock service and update the user info
   * get response from this URL
   * subscribe the recived data
   * and put it in the user object to display it
   * @memberof TitlesService
   */
  get_User_Info() {
    this.http.get<{ message: string, User_Info: User }>('http://localhost:3000/api/title').    // get response from this URL
      subscribe((UserData) => {       // subscribe the recived data
        this.User = UserData.User_Info;       // and put it in the user object to display it
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

}
