import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './profile.model';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })


export class Titles_Service {

  constructor(private http: HttpClient) { }

  private User: User   // user data member to put user info inside

  private User_Updated = new Subject<User>()




  get_User_Info()            //  to get the json response from the mock service and update the user info
  {
    this.http.get<{ message: string, User_Info: User }>('http://localhost:3000/api/title').    // get response from this URL
      subscribe((UserData) => {       // subscribe the recived data 
        this.User = UserData.User_Info;       // and put it in the user object to display it
        this.User_Updated.next(this.User);
      });
  }
  get_User_Info_updated() {            // to update the user info as observed 
    return this.User_Updated.asObservable();
  }

}