import { Component, OnInit } from '@angular/core';
import { BookDetails } from './book-entity.model';
import { Subscription } from 'rxjs';
import { BookTitle_Service } from './book-entity.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-entity',
  templateUrl: './book-entity.component.html',
  styleUrls: ['./book-entity.component.css']
})
export class BookEntityComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  /**
   *
   * subscription of service
   * @private
   * @type {Subscription}
   * @memberof BookEntityComponent
   */
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  /**
   *
   * carries book details information
   * @type {BookDetails[]}
   * @memberof BookEntityComponent
   */
  public book_details: BookDetails[] = [];
  // tslint:disable-next-line:variable-name
  /**
   *
   * carries the index of the book 
   * @memberof BookEntityComponent
   */
  book_index = 1;
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of BookEntityComponent.
   * @param {BookTitle_Service} booktitle_service
   * @memberof BookEntityComponent
   */
  constructor(public booktitle_service: BookTitle_Service) { }
  /**
   *
   * function used to recieve information from services.tss
   * @memberof BookEntityComponent
   */
  ngOnInit() {
    this.booktitle_service.get_book_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name 
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe((book_Information: BookDetails[]) => {
      this.book_details = book_Information;
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  /**
   *
   * button function to show hidden information
   * @memberof BookEntityComponent
   */
  more_book_discription() {
    const dots = document.getElementById('dots-book-discription');
    const moreText = document.getElementById('more-book-discription');
    const btnText = document.getElementById('myBtn-book-discription');
    if (dots.style.display === 'none') {
      dots.style.display = 'inline';
      btnText.innerHTML = 'Read more';
      moreText.style.display = 'none';
    } else {
      dots.style.display = 'none';
      btnText.innerHTML = 'Read less';
      moreText.style.display = 'inline';
    }
  }

}
