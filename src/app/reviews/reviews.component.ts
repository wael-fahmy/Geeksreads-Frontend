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
  SnapshotParam = 'initial value';
  ReviewID: string;
  BookID: string;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.SnapshotParam = this.route.snapshot.paramMap.get('reviewid');
    this.ReviewID = this.SnapshotParam;
    this.SnapshotParam = this.route.snapshot.paramMap.get('bookid');
    this.BookID = this.SnapshotParam;
  }

}
