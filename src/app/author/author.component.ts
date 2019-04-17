import { Component, OnInit } from '@angular/core';
import { AuthorModel } from './author.model';
import { Subscription } from 'rxjs';
import { AuthorService } from './author.service';

/**
 *  Author page component
 *  @export
 *  @class AuthorComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

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
  authorInfo: AuthorModel;

  /**
   *  Author's Id
   */
  authorId = 12345;

  /**
   *  Name of the author
   */
  authorName = 'Name of the author';

  /**
   *  Link to the author's picture
   */
  authorPicture = 'https://via.placeholder.com/86x120';

  /**
   *  Is the currently signed in user following this author or not
   */
  authorIsFollowing = false;

  /**
   *  Number of users following this author
   */
  authorNumberOfFollowers = 400;

  /**
   *  More details about this author
   */
  authorDetails = 'More details about this author';

  /**
   *  Follows an author
   *  @memberof AuthorComponent
   */
  followAuthor() {
    // TODO: Send request
    this.authorIsFollowing = true;
    this.authorNumberOfFollowers += 1;
    console.log('Following this author');
  }

  /**
   *  Unfollows an author
   *  @memberof AuthorComponent
   */
  unfollowAuthor() {
    // TODO: Send request
    this.authorIsFollowing = false;
    this.authorNumberOfFollowers -= 1;
    console.log('Unfollowing this author');
  }

  /**
   *  Creates an instance of AuthorComponent.
   *  @param {AuthorService} authorService
   *  @memberof AuthorComponent
   */
  constructor(public authorService: AuthorService) { }

  /**
   *  Author component initialization
   *  @memberof AuthorComponent
   */
  ngOnInit() {
    this.authorService.getAuthorInfo();

    this.authorSubscription = this.authorService.getAuthorInfoUpdated().
      subscribe((authorInformation: AuthorModel) => {
        this.authorInfo = authorInformation;

        this.authorId = this.authorInfo.authorId;
        this.authorName = this.authorInfo.authorName;
        this.authorPicture = this.authorInfo.authorPicture;
        this.authorNumberOfFollowers = this.authorInfo.authorNumberOfFollowers;
        // this.authorDetails = this.authorInfo.authorDetails;
        // this.authorIsFollowing = this.authorInfo.authorIsFollowing;
      });
  }
}
