import { Component, OnInit } from '@angular/core';
import {BookDetails} from './book-entity.model';
import {Subscription} from 'rxjs';
import {BookTitle_Service} from './book-entity.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-entity',
  templateUrl: './book-entity.component.html',
  styleUrls: ['./book-entity.component.css']
})
export class BookEntityComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  public book_details: BookDetails[] = [];
  // tslint:disable-next-line:variable-name
  book_index = 2;
  // tslint:disable-next-line:variable-name
  constructor(public booktitle_service: BookTitle_Service )  {}
  ngOnInit() {
    this.booktitle_service.get_book_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_book_Info_updated().subscribe( (book_Information: BookDetails[]) => {
        this.book_details = book_Information;
        /* console.log(this.User_info.User_Name)
        console.log(this.User_info.user_id)
        console.log(this.User_info.User_Photo)*/
    });
  }
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
