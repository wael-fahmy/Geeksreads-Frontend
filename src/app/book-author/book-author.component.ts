import { Component, OnInit } from '@angular/core';
import { AuthorDetails } from './book-author.model';
import { Subscription } from 'rxjs';
import { AuthorDetails_Service } from './book-author.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-author',
  templateUrl: './book-author.component.html',
  styleUrls: ['./book-author.component.css']
})
export class BookAuthorComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  /**
   *
   * server subscription
   * @private
   * @type {Subscription}
   * @memberof BookAuthorComponent
   */
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  /**
   *
   * variable to carry recieved author details list from services.ts
   * @type {AuthorDetails[]}
   * @memberof BookAuthorComponent
   */
  public author_details: AuthorDetails[] = [];
  // tslint:disable-next-line:variable-name
  /**
   *
   * index of the current author in the list
   * @memberof BookAuthorComponent
   */
  author_index = 1;
  // tslint:disable-next-line:variable-name
  /**
   * Creates an instance of BookAuthorComponent.
   * @param {AuthorDetails_Service} authordetails_service
   * @memberof BookAuthorComponent
   */
  constructor(public authordetails_service: AuthorDetails_Service) { }
  /**
   *
   * function used to read author list from services.ts
   * @memberof BookAuthorComponent
   */
  ngOnInit() {
    this.authordetails_service.get_author_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.authordetails_service.get_author_details_updated().subscribe((author_Information: AuthorDetails[]) => {
      this.author_details = author_Information;
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }
  /**
   *
   * function used to show hidden information of the author details
   * @memberof BookAuthorComponent
   */
  more_author_details() {
    const dots = document.getElementById('dots-author-discription');
    const moreText = document.getElementById('more-author-discription');
    const btnText = document.getElementById('myBtn-author-discription');
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
