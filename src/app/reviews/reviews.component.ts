import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

/**
 *
 * Reviews Component
 * @export
 * @class ReviewsComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  /**
   *
   * variable to carry url parameter
   * @memberof ReviewsComponent
   */
  SnapshotParam = 'initial value';
  /**
   *
   * vairable to carry review id
   * @type {string}
   * @memberof ReviewsComponent
   */
  ReviewID: string;
  /**
   *
   * vairable to carry book id
   * @type {string}
   * @memberof ReviewsComponent
   */
  BookID: string;
  /**
   * Creates an instance of ReviewsComponent.
   * @param {ActivatedRoute} route
   * @memberof ReviewsComponent
   */
  constructor(private route: ActivatedRoute) { }
  /**
   *
   * intilize class
   * @memberof ReviewsComponent
   */
  ngOnInit() {
    this.SnapshotParam = this.route.snapshot.paramMap.get('reviewid');
    this.ReviewID = this.SnapshotParam;
    this.SnapshotParam = this.route.snapshot.paramMap.get('bookid');
    this.BookID = this.SnapshotParam;
  }

}
