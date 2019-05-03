import { Component, OnInit } from '@angular/core';
import { ProfileEditService } from './profile-edit.service';

/**
 *  Edit Profile Component
 *  @export
 *  @class ProfileEditComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {


  myDate = '';
  username = '';
  photo = '';
  oldpassword = '';
  newpassword = '';



  /**
   *  Creates an instance of ProfileEditComponent.
   *  @memberof ProfileEditComponent
   */
  constructor(private profileEditService: ProfileEditService) { }

  /**
   *  Angular Init
   *  @memberof ProfileEditComponent
   */
  ngOnInit() {


    console.log(this.photo)
    this.profileEditService.getUserData().subscribe(data => {
      console.log(data);
      this.myDate = data.UserBirthDate;
      this.username = data.UserName;
      this.photo = data.photo;
    }, error => {
      console.log(error);
    });
  }

  edit_profile_button() {
    /* console.log(this.myDate , this.username ,this.oldpassword,this.newpassword); */
    this.photo = 'https://banner2.kisspng.com/20180828/sxw/' +
      'kisspng-clip-art-computer-icons-user-download-chamber-of-d-talonpaw-svg-png-icon-' +
      'free-download-175238-on-5b84c95a116717.2809616615354289540713.jpg';


    this.profileEditService.updateProfile(this.myDate, this.username, this.photo).subscribe(updateProfileResponse => {

      if (this.oldpassword == "" && this.newpassword == "") {
        alert(updateProfileResponse.ReturnMsg);
      } else {

        this.profileEditService.updatepassword(this.oldpassword, this.newpassword).subscribe(updatePasswordResponse => {
          alert(updatePasswordResponse.ReturnMsg);
        }, error => {
          console.log(error);
          alert(error.error.ReturnMsg);
        });
      }
    }, error => {
      console.log(error);
      alert(error.error.ReturnMsg);
    });




  }
}
