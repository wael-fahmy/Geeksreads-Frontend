import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

@Input() userimage: string;

@Input() username: string;

@Input() userid: string;

@Input() userbody: string;

@Input() userdate: string;
  constructor() { }

  ngOnInit() {
  }

}
