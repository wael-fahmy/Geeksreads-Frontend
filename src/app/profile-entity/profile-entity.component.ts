import { Component, OnInit } from '@angular/core';
import { Titles_Service } from './profile-entity.service';
import { User } from './profile.model';
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-profile-entity',
  templateUrl: './profile-entity.component.html',
  styleUrls: ['./profile-entity.component.css']
})
export class ProfileEntityComponent implements OnInit {

  private Sub_profile: Subscription

  User_info: User;            // user object contains user info

  constructor(public Titles_Service: Titles_Service) { }

  ngOnInit() {

    this.Titles_Service.get_User_Info();                                  // to get the user info from the service
    this.Sub_profile = this.Titles_Service.get_User_Info_updated().
      subscribe((User_Information: User) => {
        this.User_info = User_Information;
        /* console.log(this.User_info.User_Name)
         console.log(this.User_info.user_id)
         console.log(this.User_info.User_Photo)*/
      });
  }

}
