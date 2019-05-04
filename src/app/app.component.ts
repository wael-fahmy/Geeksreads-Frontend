import { Component, OnInit } from '@angular/core';
import { DataSharingService } from './nav-bar/data-sharing.service';
import { NotificationModel } from './notification-model';
import { NotificationService } from './notification.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { timer } from 'rxjs';

/**
 * App Component
 * @export
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  /**
   * Application Title
   */
  title = 'geeksreads';

  /**
   * Notification Subscription
   * @private
   * @type {Subscription}
   * @memberof AppComponent
   */
  private notificationSubscription: Subscription;

  /**
   * Get user notifications
   * @returns
   * @memberof AppComponent
   */
  getNotifications() {
    if (localStorage.getItem('token') === null) {
      return;
    }
    timer(5000, 1000).subscribe(x => {
      this.notificationService.getNotifications();
      this.notificationSubscription = this.notificationService.getNotificationUpdated()
        .subscribe((notificationInformation: NotificationModel[]) => {
          console.log(notificationInformation);
        }, (error: { json: () => void; }) => {
          console.log(error);
        });
    });
  }

  /**
   * Creates an instance of AppComponent.
   * @param {DataSharingService} dataSharingService
   * @param {NotificationService} notificationService
   * @memberof AppComponent
   */
  constructor(public dataSharingService: DataSharingService, public notificationService: NotificationService) { }

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
