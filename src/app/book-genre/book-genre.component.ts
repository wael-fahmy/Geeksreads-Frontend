import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-genre',
  templateUrl: './book-genre.component.html',
  styleUrls: ['./book-genre.component.css']
})
export class BookGenreComponent implements OnInit {

  public panelOpenState: boolean;
  @Input() genre: string;
  constructor() { }

  ngOnInit() {
  }

}
