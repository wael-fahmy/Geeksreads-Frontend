import { Component, OnInit, Input } from '@angular/core';


/**
 *
 * main class
 * @export
 * @class BookGenreComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-book-genre',
  templateUrl: './book-genre.component.html',
  styleUrls: ['./book-genre.component.css']
})

export class BookGenreComponent implements OnInit {

  /**
   *
   * expannsion panel
   * @type {boolean}
   * @memberof BookGenreComponent
   */
  public panelOpenState: boolean;
  /**
   *
   * vairable to carry genre
   * @type {string}
   * @memberof BookGenreComponent
   */
  @Input() genre: string;
  /**
   * Creates an instance of BookGenreComponent.
   * @memberof BookGenreComponent
   */
  constructor() { }
/**
 *
 * intialize
 * @memberof BookGenreComponent
 */
ngOnInit() {
  }

}
