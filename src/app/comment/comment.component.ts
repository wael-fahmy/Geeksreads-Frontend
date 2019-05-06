import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { TitlesService } from './comment.serivce';
import { User } from '../profile-entity/profile.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() userName: string;
  @Input() userId: string;
  @Input() Body: string;
  @Input() date: string;
  @Input() Photo: string;
  @Input() ReviewId: string;
  @Input() CommentId: string;
  ///////////////////////////////////////////
  private subProfile: Subscription;
  userInfo: User;
  userCoverPhoto: string ;
  ///////////////////////////////////////////
  constructor(public titlesService: TitlesService) { }

  ngOnInit() {
    this.titlesService.get_User_Info(this.userId);                               // to get the user info from the service
    this.subProfile = this.titlesService.get_User_Info_updated().       // once the class is initialized
      subscribe((userInformation: User) => {                            //  supscripe the value recieved
        this.userInfo = userInformation;
        this.Photo = this.userInfo.Photo;
      });
    this.CutDate();
  }
  CutDate() {
    const word = this.date.split('T');
    this.date = word[0];
  }
}
