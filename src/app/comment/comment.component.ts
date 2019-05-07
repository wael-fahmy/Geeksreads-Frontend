import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { TitlesService } from './comment.serivce';
import { User } from '../profile-entity/profile.model';
import { Subscription } from 'rxjs';


/**
 *
 * main class
 * @export
 * @class CommentComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {

  /**
   *
   * vraible to carry user name
   * @type {string}
   * @memberof CommentComponent
   */
  @Input() userName: string;
  /**
   *
   * vairable to carry user id
   * @type {string}
   * @memberof CommentComponent
   */
  @Input() userId: string;
  /**
   *
   * vairable to carry user body
   * @type {string}
   * @memberof CommentComponent
   */
  @Input() Body: string;
  /**
   *
   * variable to carry user date
   * @type {string}
   * @memberof CommentComponent
   */
  @Input() date: string;
  /**
   *
   * vairable to carry user photo
   * @type {string}
   * @memberof CommentComponent
   */
  @Input() Photo: string;
  /**
   *
   * variable to carry review id
   * @type {string}
   * @memberof CommentComponent
   */
  @Input() ReviewId: string;
  /**
   *
   * varaible to carry comment id
   * @type {string}
   * @memberof CommentComponent
   */
  @Input() CommentId: string;
  ///////////////////////////////////////////
  /**
   *
   * subscription
   * @private
   * @type {Subscription}
   * @memberof CommentComponent
   */
  private subProfile: Subscription;
  /**
   *
   * variable to carry user details
   * @type {User}
   * @memberof CommentComponent
   */
  userInfo: User;
  /**
   *
   * variable to carry user cover image
   * @type {string}
   * @memberof CommentComponent
   */
  userCoverPhoto: string ;
  ///////////////////////////////////////////
  /**
   * Creates an instance of CommentComponent.
   * @param {TitlesService} titlesService
   * @memberof CommentComponent
   */
  constructor(public titlesService: TitlesService) { }
/**
 *
 * initilize class
 * @memberof CommentComponent
 */
ngOnInit() {
    this.titlesService.get_User_Info(this.userId);                               // to get the user info from the service
    this.subProfile = this.titlesService.get_User_Info_updated().       // once the class is initialized
      subscribe((userInformation: User) => {                            //  supscripe the value recieved
        this.userInfo = userInformation;
        this.Photo = this.userInfo.Photo;
      });
    this.CutDate();
  }
  /**
   *
   * set date formate
   * @memberof CommentComponent
   */
  CutDate() {
    const word = this.date.split('T');
    this.date = word[0];
  }
}
