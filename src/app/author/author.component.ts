import { ActivatedRoute, Router } from '@angular/router';
import { AuthorBooksModel } from './author-books-model';
import { AuthorFollowModel } from './author-follow-model';
import { AuthorFollowService } from './author-follow.service';
import { AuthorModel } from './author-model';
import { AuthorService } from './author.service';
import { AuthorUnfollowModel } from './author-unfollow-model';
import { AuthorUnfollowService } from './author-unfollow.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Author Component Class
 * @export
 * @class AuthorComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  /**
   * To save author id from url parameters
   * @memberof AuthorComponent
   */
  snapshotParam = 'initial value';

  /**
   * Author Subscription
   * @private
   * @type {Subscription}
   * @memberof AuthorComponent
   */
  private authorSubscription: Subscription;

  /**
   * Author Books Subsciption
   * @private
   * @type {Subscription}
   * @memberof AuthorComponent
   */
  private authorBooksSubscription: Subscription;

  /**
   * Author Model to save incoming author info
   * @type {AuthorModel}
   * @memberof AuthorComponent
   */
  public authorModel: AuthorModel;

  /**
   * Author Books Model array to save incoming books
   * @type {AuthorBooksModel[]}
   * @memberof AuthorComponent
   */
  public authorBooksModel: AuthorBooksModel[] = [];

  /**
   * Model to save author following
   * @type {AuthorFollowModel}
   * @memberof AuthorComponent
   */
  public authorFollowingModel: AuthorFollowModel;

  /**
   * Model to save author unfollowing
   * @type {AuthorUnfollowModel}
   * @memberof AuthorComponent
   */
  public authorUnfollowingModel: AuthorUnfollowModel;

  /**
   * Is the currently signed in user following this author or not
   * @type {boolean}
   * @memberof AuthorComponent
   */
  authorIsFollowing: boolean;

  /**
   * Number of users following this author
   * @type {string}
   * @memberof AuthorComponent
   */
  authorNumberOfFollowers: string;

  /**
   *  Follows an author
   *  @memberof AuthorComponent
   */
  followAuthor() {
    this.authorFollowService.followAuthor(this.snapshotParam);
    this.authorSubscription = this.authorFollowService.getFollowAuthorUpdated()
      .subscribe((authorFollow: AuthorFollowModel) => {
        this.authorFollowingModel = authorFollow;
        this.authorIsFollowing = true;
        this.authorNumberOfFollowers = this.getNumberOfFollowers();
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   *  Unfollows an author
   *  @memberof AuthorComponent
   */
  unfollowAuthor() {
    this.authorUnfollowService.unfollowAuthor(this.snapshotParam);
    this.authorSubscription = this.authorUnfollowService.getUnfollowAuthorUpdated()
      .subscribe((authorUnfollow: AuthorUnfollowModel) => {
        this.authorUnfollowingModel = authorUnfollow;
        this.authorIsFollowing = false;
        this.authorNumberOfFollowers = this.getNumberOfFollowers();
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * Get number of users following the author
   * @returns {string}
   * @memberof AuthorComponent
   */
  getNumberOfFollowers(): string {
    this.authorService.getAuthorInfo(this.snapshotParam);
    this.authorSubscription = this.authorService.getAuthorInfoUpdated()
      .subscribe((authorInformation: AuthorModel) => {
        return authorInformation.FollowingUserId.length.toString();
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
    return '';
  }

  /**
   *  Creates an instance of AuthorComponent.
   *  @param {AuthorService} authorService
   *  @memberof AuthorComponent
   */
  constructor(private route: ActivatedRoute,
              private router: Router,
              public authorFollowService: AuthorFollowService,
              public authorService: AuthorService,
              public authorUnfollowService: AuthorUnfollowService) { }

  /**
   *  Author component initialization
   *  @memberof AuthorComponent
   */
  ngOnInit() {
    // Get Author Id from URL Parameter
    this.snapshotParam = this.route.snapshot.paramMap.get('author');

    // Make sure the button is the 'Follow' Button when guest
    if (localStorage.getItem('userId') === null) {
      this.authorIsFollowing = false;
    }

    this.authorService.getAuthorInfo(this.snapshotParam);
    this.authorSubscription = this.authorService.getAuthorInfoUpdated()
      .subscribe((authorInformation: AuthorModel) => {
        this.authorModel = authorInformation;
        this.authorIsFollowing = this.authorModel.FollowingUserId.includes(localStorage.getItem('userId'));
        this.authorNumberOfFollowers = this.authorModel.FollowingUserId.length.toString();
      }, (error: { json: () => void; }) => {
        console.log(error);
      });

    this.authorService.getBooksByAuthor(this.snapshotParam);
    this.authorBooksSubscription = this.authorService.getBooksByAuthorUpdated()
      .subscribe((authorBooksInformation: AuthorBooksModel[]) => {
        this.authorBooksModel = authorBooksInformation;
        console.log(this.authorBooksModel);
        for (let i of this.authorBooksModel) {
          i.BookRating = i.BookRating.$numberDecimal;
        }
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }
}
