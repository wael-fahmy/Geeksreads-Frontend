import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {User} from './profile.model';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})


export class Titles_Service{

    constructor(private http:HttpClient)  {}
     
    private User:User

    private User_Updated=new Subject <User>() 

    


    get_User_Info()            //  to get the json response from the mock service and update the user info
    {
       this.http.get<{message:string,User_Info:User}>('http://localhost:3000/api/title').
       subscribe((UserData) => {
           this.User=UserData.User_Info
         this.User_Updated.next(this.User);
       }); 
    }
    get_User_Info_updated()
   {
       return this.User_Updated.asObservable()
   }

}