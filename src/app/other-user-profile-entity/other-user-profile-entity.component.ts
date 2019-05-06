import { Component, OnInit } from '@angular/core';
import {OtherUserService} from './other-user.service';
import { OtherUser } from './other-profile.model';
import {ListOfBooks} from '../profile-book-entity/book.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-other-user-profile-entity',
  templateUrl: './other-user-profile-entity.component.html',
  styleUrls: ['./other-user-profile-entity.component.css']
})
export class OtherUserProfileEntityComponent implements OnInit {

  /**
   *
   * sub for getting user info
   * @private
   * @type {Subscription}
   * @memberof OtherUserProfileEntityComponent
   */
  private subProfile: Subscription;

  /**
   *
   * to store user info
   * @type {User}
   * @memberof OtherUserProfileEntityComponent
   */
  userInfo: OtherUser;            // user object contains user info

  /**
   *
   * user cover photo recieved
   * @type {string}
   * @memberof OtherUserProfileEntityComponent
   */
  userCoverPhoto: string ;

  /**
   *
   * user name recieved
   * @type {string}
   * @memberof OtherUserProfileEntityComponent
   */
  userName: string;
  userEmail: string;
  userFollowers: number;
  userFollowing: number;
  userBirthDay: string;
  isFollowing: string;
  /**
   * Creates an instance of ProfileEntityComponent.
   * @param {TitlesService} titlesService
   * @memberof OtherUserProfileEntityComponent
   */
  constructor(public OtherUserService: OtherUserService,private route: ActivatedRoute) { }  // constructor of that class

  private subList: Subscription;

  /**
   *
   * List of books currently reading
   * @type {ListOfBooks[]} to store the books read info inside it
   * @memberof ProfileReadingShelfComponent
   */
  listOfBooksReading: ListOfBooks[] = [];
  listOfBooksRead: ListOfBooks[] = [];
  listOfWantToReadBooks: ListOfBooks[] = [];

  userId: string;

  OnClickFollow()
  {
     this.isFollowing = 'True';
     this.userFollowers++;
     this.OtherUserService.Follow_User(this.userId);
  }

  OnClickUnFollow()
  {
    this.isFollowing = 'False';
    this.userFollowers--;
    this.OtherUserService.UnFollow_User(this.userId);
  }

  get_listReading_observed()
  {
    this.OtherUserService.get_List_of_books_reading(this.userId);                    // to get the book info from the service
    //this.countBooksService.get_List_of_books_reading_mockup();
    this.subList = this.OtherUserService.get_List_of_books_reading_updated().
      subscribe((List: ListOfBooks[]) => {                     // subscribe the list of books recived
        this.listOfBooksReading = List;                              // and put it in the list of books to display them
      });
  }
  get_listRead_observed()
  {
    this.OtherUserService.get_List_of_books_read(this.userId);                    // to get the book info from the service
    //this.countBooksService.get_List_of_books_reading_mockup();
    this.subList = this.OtherUserService.get_List_of_books_read_updated().
      subscribe((List: ListOfBooks[]) => {                     // subscribe the list of books recived
        this.listOfBooksRead = List;                              // and put it in the list of books to display them
      });
  }
  get_listToRead_observed()
  {
    this.OtherUserService.get_List_of_books_want_to_read(this.userId);                         // to get the book info from the service
    //this.countBooksService.get_List_of_books_to_read_mockup();
    this.subList = this.OtherUserService.get_List_of_books_want_to_read_updated().
      subscribe((List: ListOfBooks[]) => {                              // subscribe the recieved data
        this.listOfWantToReadBooks = List;                                    // and put it inside the list of books to display it
      });
  }


  /**
   *
   * on initializing that class implement this function
   * to get the user info from the service
   *  once the class is initialized
   * supscripe the value recieved
   * @memberof OtherUserProfileEntityComponent
   */
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.OtherUserService.get_other_user_info(this.userId);                                  // to get the user info from the service
    this.subProfile = this.OtherUserService.get_User_Info_updated().       // once the class is initialized
      subscribe((userInformation: OtherUser) => {                            //  supscripe the value recieved
        this.userInfo = userInformation;
        this.userCoverPhoto = this.userInfo.Photo;
        this.userName = this.userInfo.UserName;
        this.userEmail = this.userInfo.UserEmail;
        this.userFollowers = this.userInfo.NoOfFollowers;
        this.userFollowing = this.userInfo.NoOfFollowings;
        this.isFollowing = this.userInfo.IsFollowing;
      });
      this.get_listReading_observed();
      this.get_listRead_observed();
      this.get_listToRead_observed();
  }

}

