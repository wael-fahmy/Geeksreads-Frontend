import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsfeed-post',
  templateUrl: './newsfeed-post.component.html',
  styleUrls: ['./newsfeed-post.component.css']
})
export class NewsfeedPostComponent implements OnInit {

  nameOfUser;
  userImage;
  bookName;
  authorName:string='paulo';
  userName;
  activityDate;
  activityLog;



  constructor() { }

  ngOnInit() {
  }

}
