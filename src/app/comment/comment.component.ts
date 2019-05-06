import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() userName: string;
  @Input() userId: string;
  @Input() Body: string;
  @Input() date: string;
  @Input() Photo: string;
  @Input() ReviewId: string;
  @Input() CommentId: string;

  constructor() { }

  ngOnInit() {
    this.Photo = 'https://cdn.shopify.com/s/files/1/0078/6563/0831/products/TogaPrint_grande.png?v=1552807118';
    this.CutDate();
  }
  CutDate() {
    const word = this.date.split('T');
    this.date = word[0];
  }
}
