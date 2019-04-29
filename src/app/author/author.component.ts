import { AuthorFollowModel } from './author-follow-model';
import { AuthorFollowService } from './author-follow.service';
import { AuthorModel } from './author-model';
import { AuthorService } from './author.service';
import { AuthorUnfollowModel } from './author-unfollow-model';
import { AuthorUnfollowService } from './author-unfollow.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                        Subscription and Models                                                        //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   * Author Subscription
   * @private
   * @type {Subscription}
   * @memberof AuthorComponent
   */
  private authorSubscription: Subscription;

  /**
   *  An object to fill with the JSON response
   *  @type {AuthorModel}
   *  @memberof AuthorComponent
   */
  authorModel: AuthorModel;

  /**
   * Author Follow Model
   * @type {AuthorFollowModel}
   * @memberof AuthorComponent
   */
  authorFollowModel: AuthorFollowModel;

  /**
   * Author Unfollow Model
   * @type {AuthorUnfollowModel}
   * @memberof AuthorComponent
   */
  authorUnfollowModel: AuthorUnfollowModel;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                           HTML Variables                                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Author's Id
   */
  authorId = '';

  /**
   *  Name of the author
   */
  authorName = '';

  /**
   *  Link to the author's picture
   */
  authorPicture = '';

  /**
   *  Is the currently signed in user following this author or not
   */
  authorIsFollowing: boolean;

  /**
   *  Number of users following this author
   */
  authorNumberOfFollowers = '';

  /**
   *  More details about this author
   */
  authorDetails = '';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                              Methods                                                                  //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Follows an author
   *  @memberof AuthorComponent
   */
  followAuthor() {
    this.authorFollowService.followAuthor();
    this.authorSubscription = this.authorFollowService.getFollowAuthorUpdated()
      .subscribe((authorFollow: AuthorFollowModel) => {
        console.log('Following this author');
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   *  Unfollows an author
   *  @memberof AuthorComponent
   */
  unfollowAuthor() {
    this.authorIsFollowing = false;
    console.log('Unfollowing this author');
    this.authorUnfollowService.unfollowAuthor();
    this.authorSubscription = this.authorUnfollowService.getUnfollowAuthorUpdated()
      .subscribe((authorUnfollow: AuthorUnfollowModel) => {
        console.log('Unfollowing this author');
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * If user is not signed in
   * follow author button is shown
   * @memberof AuthorComponent
   */
  setIsFollowing() {
    if (localStorage.getItem('userId') === null) {
      this.authorIsFollowing = false;
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                              Constructor                                                              //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Creates an instance of AuthorComponent.
   *  @param {AuthorService} authorService
   *  @memberof AuthorComponent
   */
  constructor(public authorService: AuthorService,
              public authorFollowService: AuthorFollowService,
              public authorUnfollowService: AuthorUnfollowService) { }

  /**
   *  Author component initialization
   *  @memberof AuthorComponent
   */
  ngOnInit() {
    this.setIsFollowing();
    this.authorService.getAuthorInfo();
    this.authorSubscription = this.authorService.getAuthorInfoUpdated()
      .subscribe((authorInformation) => {
        console.log(authorInformation);
        this.authorId = authorInformation.AuthorId;
        this.authorName = authorInformation.AuthorName;
        this.authorPicture = authorInformation.Photo;
        this.authorNumberOfFollowers = authorInformation.FollowingUserId.length.toString();
        this.authorDetails = authorInformation.About;
        // this.authorIsFollowing = this.authorInfo.authorIsFollowing;
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }
}
