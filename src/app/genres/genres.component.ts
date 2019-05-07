import { Component, OnInit } from '@angular/core';

/**
 *
 * Genres Component
 * @export
 * @class GenresComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genreType1 = 'Thriller';

  genreType2 = 'Comedy';

  genreType3 = 'Horror';
  /**
   *  Creates an instance of GenresComponent.
   *  @memberof GenresComponent
   */
  constructor() { 
    
  }

  
  /**
   *
   * Angular Init
   * @memberof GenresComponent
   */
  ngOnInit() { }
 
}
