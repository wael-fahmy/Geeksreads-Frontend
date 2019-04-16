import { Component, OnInit } from '@angular/core';

/**
 * Genre row component
 * @export
 * @class GenreRowComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-genre-row',
  templateUrl: './genre-row.component.html',
  styleUrls: ['./genre-row.component.css']
})
export class GenreRowComponent implements OnInit {

  /**
   * Genre Type
   * @memberof GenreRowComponent
   */
  genretype = '';

  /**
   * First book image
   * @memberof GenreRowComponent
   */
  bookimage1 = '';

  /**
   * Second Book Image
   * @memberof GenreRowComponent
   */
  bookimage2 = '';

  /**
   * Third book Image
   * @memberof GenreRowComponent
   */
  bookimage3 = '';

  /**
   * Creates an instance of GenreRowComponent.
   * @memberof GenreRowComponent
   */
  constructor() { }

  /**
   * conatins all the function in service class
   *
   * @memberof GenreRowComponent
   */
  ngOnInit() {
  }

}
