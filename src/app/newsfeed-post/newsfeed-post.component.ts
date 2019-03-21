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

  constructor() { }

  ngOnInit() {
  }

}
