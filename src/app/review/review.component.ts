import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() reviewerimage: string;
  @Input() reviewername: string;
  @Input() reviewerdate: string;
  @Input() reviewerbody: string;
  @Input() reviewerlikes: string;
  @Input() reviewerid: string;
  @Input() reviewercomments: string;
  @Input() userid: string;

  befordots: string;
  afterdots: string;

  constructor() { }

  ngOnInit() {
    console.log(this.reviewerid);
    this.SplitString();
  }
  SplitString() {
    const word = this.reviewerbody.split(',');
    this.befordots = word[0];
    this.afterdots = word[1];
  }
  more_user_preview() {
    let dots: HTMLElement;
    let moreText: HTMLElement;
    let btnText: HTMLElement;
    dots = document.getElementById('dots-user-review');
    moreText = document.getElementById('more-review');
    btnText = document.getElementById('myBtn-user-review');
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
  ClickStorage() {
    localStorage.removeItem('ISBN');
    localStorage.removeItem('bookTitle');
    localStorage.removeItem('publishedDate');
    localStorage.removeItem('publisher');
    localStorage.removeItem('pages');
    localStorage.removeItem('genre');
  }

}
