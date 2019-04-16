import { Component, OnInit } from '@angular/core';

/**
 *  Footer Component
 *  @export
 *  @class FooterComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  /**
   *  Creates an instance of FooterComponent.
   *  @memberof FooterComponent
   */
  constructor() { }

  /**
   *  Angular ngOnInit
   *  @memberof FooterComponent
   */
  ngOnInit() {
    document.getElementById('footer-year').innerHTML = new Date().getFullYear().toString();
  }

}
