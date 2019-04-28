import { Component, OnInit } from '@angular/core';
import {
  AuthorService, AuthorFollowService, AuthorUnfollowService
} from './author.service';
import { Subscription, Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { take, map } from "rxjs/operators";

export interface AuthorModel {

  /**
   *  A brief information about the author
   */
  About: string;

  /**
   *  Author's Id
   */
  AuthorId: string;

  /**
   *  Name of the author
   */
  AuthorName: string;

  /**
   * Books written by this author
   * @type {string[]}
   * @memberof AuthorModel
   */
  BookId: string[];

  /**
   * Array of user ids following this author
   * @type {string[]}
   * @memberof AuthorModel
   */
  FollowingUserId: string[];

  /**
   *  Link to the author's picture
   */
  Photo: string;

  // tslint:disable-next-line:variable-name
  _id: string;
}

export interface AuthorFollowModel {
  /**
   * User now follows author
   * @type {boolean}
   * @memberof FollowAuthor
   */
  success: boolean;

  /**
   * Message
   * @type {string}
   * @memberof FollowAuthor
   */
  message: string;
}

export interface AuthorUnfollowModel {
  /**
   * User now unfollows author
   * @type {boolean}
   * @memberof FollowAuthor
   */
  success: boolean;

  /**
   * Message
   * @type {string}
   * @memberof FollowAuthor
   */
  message: string;
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(Breakpoints.Handset)
  .pipe(map(authorModel => authorModel.matches));

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

  /**
   *  Creates an instance of AuthorComponent.
   *  @param {AuthorService} authorService
   *  @memberof AuthorComponent
   */
  constructor(public authorService: AuthorService,
              public authorFollowService: AuthorFollowService,
              public authorUnfollowService: AuthorUnfollowService,
              private breakpointObserver: BreakpointObserver) { }

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
