import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Row } from './genre-row.model';
import { RowServices } from './genre-row.service';

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
   * initialization of genre type
   * @memberof GenreRowComponent
   */
  genretype = 'Romance';

  /**
   * book image 1
   * @memberof GenreRowComponent
   */
  bookimage1 = 'https://via.placeholder.com/120x120';

  /**
   * book image 2
   * @memberof GenreRowComponent
   */
  bookimage2 = 'https://via.placeholder.com/120x120';

  /**
   *
   * book image 3
   * @memberof GenreRowComponent
   */
  bookimage3 = 'https://via.placeholder.com/120x120';
  /**
   * Creates an instance of GenreRowComponent.
   * @memberof GenreRowComponent
   */

  /**
   * Row object created to fill data
   * @type {Row}
   * @memberof GenreRowComponent
   */
  RowObj: Row;

  /**
   *
   * @private
   * @type {Subscription}
   * @memberof GenreRowComponent
   */
  private subprofile: Subscription;

  /**
   * Creates an instance of GenreRowComponent.
   * @param {RowServices} rowServicesObj
   * @memberof GenreRowComponent
   */
  constructor(private rowServicesObj: RowServices) { }

  /**
   * conatins all the function in service class
   *
   * @memberof GenreRowComponent
   */
  ngOnInit() {
    this.rowServicesObj.get_row();
    this.subprofile = this.rowServicesObj.get_row_updated().subscribe((RowData: Row) => {
      this.RowObj = RowData;
      this.genretype = this.RowObj.genretype;
      this.bookimage1 = this.RowObj.bookimage1;
      this.bookimage2 = this.RowObj.bookimage2;
      this.bookimage3 = this.RowObj.bookimage3;
    });
  }
}
