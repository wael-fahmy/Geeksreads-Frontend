import { Component, Input, OnInit } from '@angular/core';
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

  @Input() genreType: string;

  /**
   * book image 1
   * @memberof GenreRowComponent
   */
  bookImage1 = 'https://via.placeholder.com/120x120';

  /**
   * book image 2
   * @memberof GenreRowComponent
   */
  bookImage2 = 'https://via.placeholder.com/120x120';

  /**
   *
   * book image 3
   * @memberof GenreRowComponent
   */
  bookImage3 = 'https://via.placeholder.com/120x120';

  /**
   * Row object created to fill data
   * @type {Row}
   * @memberof GenreRowComponent
   */
  RowObj: Row;

  /**
   * Subscription
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
   * @memberof GenreRowComponent
   */
  ngOnInit() {
    this.rowServicesObj.get_row(this.genreType);
    this.subprofile = this.rowServicesObj.get_row_updated().subscribe((RowData: Row) => {
      this.RowObj = RowData;
      this.genreType = this.RowObj.genretype;
      this.bookImage1 = this.RowObj.bookimage1;
      this.bookImage2 = this.RowObj.bookimage2;
      this.bookImage3 = this.RowObj.bookimage3;
    });
  }
  See_more_genres() {
    //ToDo implement any function
  }
}
