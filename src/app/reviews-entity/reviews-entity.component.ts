import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviews-entity',
  templateUrl: './reviews-entity.component.html',
  styleUrls: ['./reviews-entity.component.css']
})
export class ReviewsEntityComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  more_review_discription() {
    const dots = document.getElementById('dots-user-review');
    const moreText = document.getElementById('more-review');
    const btnText = document.getElementById('myBtn-user-review');
    if (dots.style.display === 'none') {
      dots.style.display = 'inline';
      btnText.innerHTML = 'Read Full Review';
      moreText.style.display = 'none';
    } else {
      dots.style.display = 'none';
      btnText.innerHTML = 'Show Less Review';
      moreText.style.display = 'inline';
    }
  }
}
