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
  @Input() bookId: string;
  @Input() authorId: string; 
  @Input() userId: string; 
 

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


   constructor(private addToShelfService: AddToShelfService) { }
  
  /**
   * The  functions created in the service are implemented here
   *
   * @memberof NewsfeedPostComponent
   */
  ngOnInit() {  
  }
}
