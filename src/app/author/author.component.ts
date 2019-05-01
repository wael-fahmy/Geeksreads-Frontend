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

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  snapshotParam = 'initial value';
  subscribedParam = 'initial value';
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                        Subscription and Models                                                      //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                           HTML Variables                                                            //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  authorBookId = '';
  authorBookName = '';
  authorBookPicture = '';
  authorBookRating = '';
  authorBookShelf = '';

  books: [];
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                              Methods                                                                //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Follows an author
   *  @memberof AuthorComponent
   */
  followAuthor() {
    this.authorFollowService.followAuthor(this.authorId);
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
    this.authorUnfollowService.unfollowAuthor(this.authorId);
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                              Constructor                                                            //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /**
   *  Creates an instance of AuthorComponent.
   *  @param {AuthorService} authorService
   *  @memberof AuthorComponent
   */
  constructor(public authorService: AuthorService,
              public authorFollowService: AuthorFollowService,
              public authorUnfollowService: AuthorUnfollowService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) { }

  /**
   *  Author component initialization
   *  @memberof AuthorComponent
   */
  ngOnInit() {
    this.snapshotParam = this.route.snapshot.paramMap.get('author');
    // Subscribed
    // this.route.paramMap.subscribe(params => {
    //   this.subscribedParam = params.get('author');
    // });
    this.setIsFollowing();

    this.authorService.getAuthorInfo(this.snapshotParam);
    this.authorSubscription = this.authorService.getAuthorInfoUpdated()
      .subscribe((authorInformation: AuthorModel) => {
        this.authorId = authorInformation.AuthorId;
        this.authorName = authorInformation.AuthorName;
        this.authorPicture = authorInformation.Photo;
        this.authorNumberOfFollowers = authorInformation.FollowingUserId.length.toString();
        this.authorDetails = authorInformation.About;
        // this.authorIsFollowing = this.authorInfo.authorIsFollowing;
      }, (error: { json: () => void; }) => {
        console.log(error);
      });

    this.authorService.getBooksByAuthor(this.snapshotParam);
    this.authorBooksSubscription = this.authorService.getBooksByAuthorUpdated()
      .subscribe((authorBooksInformation: AuthorBooksModel) => {
        console.log(authorBooksInformation);
        this.authorBookName = authorBooksInformation.Title;
        this.authorBookShelf = authorBooksInformation.ReadStatus;
        this.authorBookPicture = authorBooksInformation.Cover;
        this.authorBookRating = authorBooksInformation.BookRating.$numberDecimal;
        this.authorBookId = authorBooksInformation.BookId;
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }
}
