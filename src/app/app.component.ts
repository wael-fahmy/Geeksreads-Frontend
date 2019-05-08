import { Component, OnInit } from '@angular/core';
import { DataSharingService } from './nav-bar/data-sharing.service';

/**
 * App Component
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  /**
   * Application Title
   * @memberof AppComponent
   */
  title = 'geeksreads';

  /**
   * Scroll to top when routing
   * @param {*} event
   * @memberof AppComponent
   */
  onActivate(event) {
    window.scroll(0, 0);
    // or document.body.scrollTop = 0;
    // or document.querySelector('body').scrollTo(0,0)
  }

  /**
   * Creates an instance of AppComponent.
   * @param {DataSharingService} dataSharingService
   * @param {NotificationService} notificationService
   * @memberof AppComponent
   */
  constructor(public dataSharingService: DataSharingService) { }

  /**
   * On component initialisation
   * @memberof AppComponent
   */
  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.dataSharingService.isUserLoggedIn.next(false);
    }
  }
}
