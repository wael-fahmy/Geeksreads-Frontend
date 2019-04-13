import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './profile.model';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })


export class Titles_Service {

  /**
   *Creates an instance of Titles_Service.
   * @param {HttpClient} http
   * @memberof Titles_Service
   */
  constructor(private http: HttpClient) { }

  /**
   *
   *
   * @private user data member to put user info inside
   * @type {User}
   * @memberof Titles_Service
   */
  private User: User   // user data member to put user info inside

  /**
   * to update the user info on demand
   *
   * @private
   * @memberof Titles_Service
   */
  private User_Updated = new Subject<User>()




  /**
   *
   * to get the json response from the mock service and update the user info
   * get response from this URL
   * subscribe the recived data 
   * and put it in the user object to display it
   * @memberof Titles_Service
   */
  get_User_Info()            //  to get the json response from the mock service and update the user info
  {
    this.http.get<{ message: string, User_Info: User }>('http://localhost:3000/api/title').    // get response from this URL
      subscribe((UserData) => {       // subscribe the recived data 
        this.User = UserData.User_Info;       // and put it in the user object to display it
        this.User_Updated.next(this.User);
      });
  }

  /**
   *
   * to update the user info as observed 
   * @returns
   * @memberof Titles_Service
   */
  get_User_Info_updated() {            // to update the user info as observed 
    return this.User_Updated.asObservable();
  }

}