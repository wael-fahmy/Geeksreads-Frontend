import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
/**
 *
 * Genre Component
 * @export
 * @class GenreComponent
 * @implements {OnInit}
 */

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})

export class GenreComponent implements OnInit {
  snapshotParam = 'initial value';
  /**
   * Specific Genre
   * @memberof GenreComponent
   */
  specificgenre;

  genreType1;

  showDiv: boolean;

  hideButton = false;

  showLess = false;

  /**
   *  Creates an instance of GenreComponent.
   *  @memberof GenreComponent
   */
  constructor(private route: ActivatedRoute) { }

  See_more_genres() {
    this.showDiv = true;
    this.hideButton = true;
    this.showLess = true;
  }

  /**
   * Angular Init
   * @memberof GenreComponent
   */
  ngOnInit() {
    this.snapshotParam = this.route.snapshot.paramMap.get('genreName');
    this.genreType1 = this.snapshotParam;
  }
}
