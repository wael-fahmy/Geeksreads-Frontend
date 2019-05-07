import { Component, OnInit, Input } from '@angular/core';
import { CommentsDetails } from './reviews-comments.model';
import { Subscription } from 'rxjs';
import { CommentsDetails_Service } from './reviews-comments.service';
import { TitlesService } from '../comment/comment.serivce';
import { User } from '../profile-entity/profile.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-reviews-comments',
  templateUrl: './reviews-comments.component.html',
  styleUrls: ['./reviews-comments.component.css'],
  providers: [DatePipe]
})
export class ReviewsCommentsComponent implements OnInit {
str: string;
@Input() ReviewID: string;
@Input() BookID: string;
myDate = new Date();
////////////////////////////////////////////////
private Sub_profile: Subscription;
userInfo: User;
Photo: string;
public comment_details: CommentsDetails[] = [];
/////////////////////////////////////////////////
constructor(public comments_service: CommentsDetails_Service, private datePipe: DatePipe,
            public titlesService: TitlesService) { }
  ngOnInit() {
    this.comments_service.get_comments_Info(this.ReviewID);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.comments_service.get_comments_Info_updated().subscribe((comments_Information: CommentsDetails[]) => {
      this.comment_details = comments_Information;
    });
    const userId = localStorage.getItem('userId');
    this.titlesService.get_User_Info(userId);                               // to get the user info from the service
    this.Sub_profile = this.titlesService.get_User_Info_updated().       // once the class is initialized
      subscribe((userInformation: User) => {                            //  supscripe the value recieved
        this.userInfo = userInformation;
        this.Photo = this.userInfo.Photo;
      });
  }
  SendComment() {
    let date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    date = date + 'T12:53:00.000Z';
    this.comments_service.post_Comment(this.str, this.ReviewID, this.BookID, date, this.Photo);
    this.str = '';
    location.reload();
  }
  GetCommentsUpdated() {
    this.comments_service.get_comments_Info(this.ReviewID);                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.comments_service.get_comments_Info_updated().subscribe((comments_Information: CommentsDetails[]) => {
      this.comment_details = comments_Information;
    });
  }
}
