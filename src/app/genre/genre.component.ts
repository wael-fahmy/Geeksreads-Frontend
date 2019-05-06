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

  genreType1 = 'Thriller';

  genreType2 = 'Comedy';

  genreType3 = 'Horror';

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
