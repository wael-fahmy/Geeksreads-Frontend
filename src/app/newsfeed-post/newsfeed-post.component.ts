import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsServices } from '../newsfeed/newsfeed-main.service';
import { Post } from '../newsfeed/newsfeed-main.model';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { AddToShelfService } from './add-to-shelf.service';

/**
 *  Newsfeed post component
 *  @export
 *  @class NewsfeedPostComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-newsfeed-post',
  templateUrl: './newsfeed-post.component.html',
  styleUrls: ['./newsfeed-post.component.css']
})

export class NewsfeedPostComponent implements OnInit {

  @Input() userName: string;
  @Input() NumberOfStars: any;
  @Input() activityDate: string;
  @Input() bookimage: any;
  @Input() bookname: any;
  @Input() authorname: any;
  @Input() bookstatus: any;
  @Input() review: string;
  @Input() makerImage: string;
  @Input() bookId : string;
 // @Input() reviewMakerId: any;

  /**
   *  This is the constructor of the component class, it makes an instance of the posts service class
   *  @private
   *  @type {Subscription}
   *  @memberof NewsfeedPostComponent
   */
  private subprofile: Subscription;

  /**
   *
   * Post object to fill data
   * @type {Post}
   * @memberof NewsfeedPostComponent
   */
  PostObj: Post[] = [];

  /**
   *
   * User name
   * @memberof NewsfeedPostComponent
   */
  //username ;

  /**
   *
   * Activity date
   * @memberof NewsfeedPostComponent
   */
  //activitydate ;

  /**
   *
   * Book name
   * @memberof NewsfeedPostComponent
   */
 // bookname = 'Eat Pray Love';

  /**
   *
   * Author Name
   * @memberof NewsfeedPostComponent
   */
  // authorname = 'Paulo';

  /**
   *
   * Review
   * @memberof NewsfeedPostComponent
   */
  // review = 'It was really nice';

  /**
   *
   * Activity
   * @memberof NewsfeedPostComponent
   */
  activity ;

  /**
   *
   * Book Image
   * @memberof NewsfeedPostComponent
   */
  // bookimage = 'https://via.placeholder.com/120x120';

  /**
   *  Creates an instance of NewsfeedPostComponent.
   *  @param {PostsServices} PostsServicesObj
   *  @memberof NewsfeedPostComponent
   */
  constructor(private addToShelfService: AddToShelfService) { }
  authorBookIsInAShelf = false;
  shelfAction = 'Add to Shelf';
  changeToReading(){
    this.addToShelfService.addToShelf('Want to read', this.bookId);
    this.authorBookIsInAShelf = true;
    this.shelfAction = 'Want to Read';
    document.getElementById('author-book-shelf-button').style.backgroundColor = '#f2f2f2';
    document.getElementById('author-book-shelf-button').style.color = '#000000';
    console.log('Adding to Want to Read Shelf');
  }

  /**
   * The  functions created in the service are implemented here
   *
   * @memberof NewsfeedPostComponent
   */
  ngOnInit() {
    // this.PostsServicesObj.getpost();
    // this.subprofile = this.PostsServicesObj.get_post_updated().subscribe((PostInfo: Post[]) => {
    //   this.PostObj = PostInfo;
    //   this.activity = this.PostObj[0].StatusType;
    //   this.activitydate = this.PostObj[0].ReviewDate;
    //   // this.authorname = this.PostObj[0].;
    //   this.bookimage = this.PostObj[0].BookPhoto;
    //   this.bookname = this.PostObj[0].BookName;
    //   this.review = this.PostObj[0].ReviewBody;
    //   this.username = this.PostObj[0].ReviewMakerName;

    // });
  }
}
