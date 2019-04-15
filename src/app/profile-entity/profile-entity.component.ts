import { Component, OnInit } from '@angular/core';
import { TitlesService } from './profile-entity.service';
import { User } from './profile.model';
import { Subscription } from 'rxjs';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

/**
 *
 * Profile Entity Component
 * @export
 * @class ProfileEntityComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-profile-entity',
  templateUrl: './profile-entity.component.html',
  styleUrls: ['./profile-entity.component.css']
})
export class ProfileEntityComponent implements OnInit {

  /**
   *
   * sub for getting user info
   * @private
   * @type {Subscription}
   * @memberof ProfileEntityComponent
   */
  private subProfile: Subscription;

  /**
   *
   * to store user info
   * @type {User}
   * @memberof ProfileEntityComponent
   */
  userInfo: User;            // user object contains user info

  /**
   *
   * user cover photo recieved
   * @type {string}
   * @memberof ProfileEntityComponent
   */
  userCoverPhoto: string ;

  /**
   *
   * user name recieved
   * @type {string}
   * @memberof ProfileEntityComponent
   */
  userName: string;

  /**
   * Creates an instance of ProfileEntityComponent.
   * @param {TitlesService} titlesService
   * @memberof ProfileEntityComponent
   */
  constructor(public titlesService: TitlesService) { }  // constructor of that class

  /**
   *
   * on initializing that class implement this function
   * to get the user info from the service
   *  once the class is initialized
   * supscripe the value recieved
   * @memberof ProfileEntityComponent
   */
  ngOnInit() {
    this.titlesService.get_User_Info();                                  // to get the user info from the service
    this.subProfile = this.titlesService.get_User_Info_updated().       // once the class is initialized
      subscribe((userInformation: User) => {                            //  supscripe the value recieved
        this.userInfo = userInformation;
        this.userCoverPhoto = this.userInfo.userPhoto;
        this.userName = this.userInfo.userName;
         /*console.log(this.userInfo.userName)
         console.log(this.userInfo.user_id)
         console.log(this.userInfo.User_Photo)*/
      });
  }

}
