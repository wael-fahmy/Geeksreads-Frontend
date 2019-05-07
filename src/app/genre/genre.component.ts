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


    showDiv: boolean;

    hideButton: boolean =  false;
    showLess: boolean = false;

  /**
   *  Creates an instance of GenreComponent.
   *  @memberof GenreComponent
   */
  constructor() { }

  See_more_genres() {
    console.log('Loading more genres ... ');

    this.showDiv = true;
    this.hideButton = true;
    this.showLess = true ;
 }
//  Show_less(){

//    this.showLess = false;
//    this.hideButton = true;
//    this.showDiv = false;
//  }


  /**
   *
   * Angular Init
   * @memberof GenreComponent
   */
  ngOnInit() {

  }

}
