import { Component, OnInit } from '@angular/core';
import { DataSharingService } from './data-sharing.service';

/**
 *  Navbar Component
 *  @export
 *  @class NavBarComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  isSignedIn: boolean;
  /**
   *  Creates an instance of NavBarComponent.
   *  @memberof NavBarComponent
   */
  constructor(private dataSharingService: DataSharingService) {
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isSignedIn = value;
  });
  }

  /**
   *  Angular ngOnInit
   *  @memberof NavBarComponent
   */
  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.isSignedIn = false;
    } else {
      this.isSignedIn = true;
    }
  }
}
