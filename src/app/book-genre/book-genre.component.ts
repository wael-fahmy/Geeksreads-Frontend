import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-genre',
  templateUrl: './book-genre.component.html',
  styleUrls: ['./book-genre.component.css']
})
export class BookGenreComponent implements OnInit {

  public panelOpenState: boolean;
  genre: string;
  constructor() { }

  ngOnInit() {
    this.genre = localStorage.getItem('genre');
  }

}
