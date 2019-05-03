import { Component, OnInit } from '@angular/core';
import { GenreDetails } from './book.model';
import { Subscription } from 'rxjs';
import { GenreDetailsService } from './book.service';
import { delay } from 'q';
import { ActivatedRoute } from "@angular/router";

/**
 *
 * Book Component
 * @export
 * @class BookComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  SnapshotParam = 'initial value';
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.SnapshotParam = this.route.snapshot.paramMap.get('bookid');
  }
}
