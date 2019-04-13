import { Component, OnInit } from '@angular/core';



/**
 *
 * 
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

  specificgenre;

  /**
   *Creates an instance of GenreComponent.
   * @memberof GenreComponent
   */
  constructor() { }


  /**
   *
   * contains all function in service class
   * @memberof GenreComponent
   */
  ngOnInit() {
  }

}
