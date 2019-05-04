import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  /**
   *  Panel open state boolean
   */
  public panelOpenState: boolean;
  @Input() bdition: string;
  @Input() bASIN: string;
  @Input() btitle: string;
  @Input() bpages: string;
  @Input() bpublished: string;
  constructor() { }
  ngOnInit() {
    this.CutDate();
  }
  CutDate() {
    const word = this.bpublished.split('T');
    this.bpublished = word[0];
  }
}
