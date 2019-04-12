import { Component, OnInit } from '@angular/core';
import { CommentsDetails } from './reviews-comments.model';
import { Subscription } from 'rxjs';
import { CommentsDetails_Service } from './reviews-comments.service';
import { delay } from 'q';
@Component({
  selector: 'app-reviews-comments',
  templateUrl: './reviews-comments.component.html',
  styleUrls: ['./reviews-comments.component.css']
})
export class ReviewsCommentsComponent implements OnInit {

// tslint:disable-next-line: variable-name
  private Sub_profile: Subscription;
// tslint:disable-next-line: variable-name
  public comment_details: CommentsDetails[] = [];
  // tslint:disable-next-line:variable-name
  constructor(public comments_service: CommentsDetails_Service) { }
  ngOnInit() {
    this.comments_service.get_comments_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.comments_service.get_comments_Info_updated().subscribe((comments_Information: CommentsDetails[]) => {
      this.comment_details = comments_Information;
      console.log(this.comment_details[0].user_name);
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }

}
