import { Component, OnInit } from '@angular/core';

/**
 *  Homepage Component
 *  @export
 *  @class HomepageComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  /**
   *  Creates an instance of HomepageComponent.
   *  @memberof HomepageComponent
   */

  books = []
  constructor() {
    this.books=[{img:"https://images.gr-assets.com/books/1348322381m/3450744.jpg", url:"http://localhost:4200/book", title:"hi"},
       {img:"https://images.gr-assets.com/books/1320428955m/2776527.jpg",url:"http://localhost:4200/book", title:"bye"},
       {img:"https://images.gr-assets.com/books/1320562005m/4214.jpg",url:"http://localhost:4200/book"},
       {img:"https://images.gr-assets.com/books/1479863624m/1618.jpg",url:"http://localhost:4200/book"},
       {img:"https://images.gr-assets.com/books/1255573980m/1713426.jpg",url:"http://localhost:4200/book"},
       {img:"https://images.gr-assets.com/books/1329421639m/50365.jpg",url:"http://localhost:4200/book"}
  ]
   }

  /**
   *  Angular Initialization
   *  @memberof HomepageComponent
   */
  ngOnInit() {
  }

}
