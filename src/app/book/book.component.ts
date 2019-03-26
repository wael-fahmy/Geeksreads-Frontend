import { Component, OnInit } from '@angular/core';
import { Genredetails } from './book.model';
import { Subscription } from 'rxjs';
import { GenreDetails_Service } from './book.service';
import { delay } from 'q';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private Sub_profile: Subscription;
  // tslint:disable-next-line:variable-name
  public genre_details: Genredetails[] = [];
  // tslint:disable-next-line:variable-name
  genre_index = 1;
  // tslint:disable-next-line:variable-name
  constructor(public booktitle_service: GenreDetails_Service) { }
  ngOnInit() {
    this.booktitle_service.get_genre_Info();                                  // to get the user info from the service
    // tslint:disable-next-line:variable-name
    this.Sub_profile = this.booktitle_service.get_genre_Info_updated().subscribe((book_Information: Genredetails[]) => {
      this.genre_details = book_Information;
      /* console.log(this.User_info.User_Name)
      console.log(this.User_info.user_id)
      console.log(this.User_info.User_Photo)*/
    });
  }

}
