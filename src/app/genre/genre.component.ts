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

  /**
   *
   * Specific Genre
   * @memberof GenreComponent
   */
  specificgenre;

  /**
   *  Creates an instance of GenreComponent.
   *  @memberof GenreComponent
   */
  constructor() { }

  /**
   *
   * Angular Init
   * @memberof GenreComponent
   */
  ngOnInit() {
  }

}
