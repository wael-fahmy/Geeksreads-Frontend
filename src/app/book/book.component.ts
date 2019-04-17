import { Component, OnInit } from '@angular/core';
import { GenreDetails } from './book.model';
import { Subscription } from 'rxjs';
import { GenreDetailsService } from './book.service';
import { delay } from 'q';

/**
 *
 * Book Component
 * @export
 * @class BookComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  /**
   *  Panel open state boolean
   */
  public panelOpenState: boolean;

  /**
   *
   * service subscription
   * @private
   * @type {Subscription}
   * @memberof BookComponent
   */
  private subProfile: Subscription;

  /**
   *
   * vairable that carries the genre details list
   * @type {Genredetails[]}
   * @memberof BookComponent
   */
  public genreDetails: GenreDetails[] = [];

  /**
   *
   * index of the genre list  currently showing
   * @memberof BookComponent
   */
  genreIndex = 2;

  /**
   * Creates an instance of BookComponent.
   * @param {GenreDetailsService} bookTitleService
   * @memberof BookComponent
   */
  constructor(public bookTitleService: GenreDetailsService) { }

  /**
   *
   * function used to read details recieved from service.ts
   * @memberof BookComponent
   */
  ngOnInit() {
    this.bookTitleService.get_genre_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.subProfile = this.bookTitleService.get_genre_Info_updated().subscribe((bookInformation: GenreDetails[]) => {
      this.genreDetails = bookInformation;
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
}
