import { Component, OnInit } from '@angular/core';

/**
 * Author page component
 *
 * @export
 */
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  /**
   * Creates an instance of AuthorComponent.
   */
  constructor() { }


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
  authorPicture = 'https://via.placeholder.com/86x120 ';

  /**
   *  Is the currently signed in user following this author or not
   */
  authorIsFollowing = false;

  /**
   *  Number of users following this author
   */
  authorNumberOfFollowers = 400;


  /**
   *
   *  More details about this author
   */
  authorDetails = 'More details about this author';

  /**
   *
   *  Follows an author
   */
  followAuthor() {
    // TODO: Send request
    this.authorIsFollowing = true;
    this.authorNumberOfFollowers += 1;
    console.log('Following this author');
  }

  /**
   *
   *  Unfollows an author
   */
  unfollowAuthor() {
    // TODO: Send request
    this.authorIsFollowing = false;
    this.authorNumberOfFollowers -= 1;
    console.log('Unfollowing this author');
  }


  /**
   *
   *  Request author's info
   */
  getAuthorInfo(authorID) {
    console.log('Component Created ' + authorID);
  }

  /**
   *
   * Angular component initialization
   */
  ngOnInit() {
    this.getAuthorInfo(this.authorId);
  }

}
