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
   *  Is the currently signed in user following this author or not
   */
  authorIsFollowing: boolean;

  /**
   * Array of author's book ids
   * @type {string[]}
   * @memberof AuthorComponent
   */
  authorBookId: string[] = [];

  /**
   * Array of author's book names
   * @type {string[]}
   * @memberof AuthorComponent
   */
  authorBookName: string[] = [];

  /**
   * Array of author's book pictures
   * @type {string[]}
   * @memberof AuthorComponent
   */
  authorBookPicture: string[] = [];

  /**
   * Array of author's book rating
   * @type {string[]}
   * @memberof AuthorComponent
   */
  authorBookRating: string[] = [];

  /**
   * Array of author's book shelf
   * @type {string[]}
   * @memberof AuthorComponent
   */
  authorBookShelf: string[] = [];

  /**
   *  Follows an author
   *  @memberof AuthorComponent
   */
  followAuthor() {
    this.authorFollowService.followAuthor(this.snapshotParam);
    console.log('Author Component: ' + this.snapshotParam);
    this.authorSubscription = this.authorFollowService.getFollowAuthorUpdated()
      .subscribe((authorFollow: AuthorFollowModel) => {
        console.log('Author Component: Following this author');
        this.authorFollowingModel = authorFollow;
        this.authorIsFollowing = true;
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   *  Unfollows an author
   *  @memberof AuthorComponent
   */
  unfollowAuthor() {
    console.log('Unfollowing this author');
    this.authorUnfollowService.unfollowAuthor(this.snapshotParam);
    this.authorSubscription = this.authorUnfollowService.getUnfollowAuthorUpdated()
      .subscribe((authorUnfollow: AuthorUnfollowModel) => {
        console.log('Author Component: Unfollowing this author');
        this.authorUnfollowingModel = authorUnfollow;
        this.authorIsFollowing = false;
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }

  /**
   * If user is not signed in, follow author button is shown
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

    // Make sure the button is the 'Follow' Button
    this.setIsFollowing();

    this.authorService.getAuthorInfo(this.snapshotParam);
    this.authorSubscription = this.authorService.getAuthorInfoUpdated()
      .subscribe((authorInformation: AuthorModel) => {
        this.authorModel = authorInformation;
      }, (error: { json: () => void; }) => {
        console.log(error);
      });

    // TODO:
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
