import { Component, OnInit } from '@angular/core';

/**
 *  Homepage Component
 *  @export
 *  @class HomepageComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  /**
   *  Creates an instance of HomepageComponent.
   *  @memberof HomepageComponent
   */
  constructor() {
    console.log("man ya bta3 zman")
   }

  /**
   *  Angular Initialization
   *  @memberof HomepageComponent
   */
  ngOnInit() {
  }

}
