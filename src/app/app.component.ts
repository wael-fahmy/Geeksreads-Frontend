import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AppComponent implements OnInit, OnDestroy {

  /**
   * Application Title
   */
  title = 'geeksreads';

  private notificationSubscription: Subscription;

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

  constructor(public dataSharingService: DataSharingService, public notificationService: NotificationService) { }

  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.dataSharingService.isUserLoggedIn.next(false);
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
