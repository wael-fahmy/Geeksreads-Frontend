import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel } from './notification-model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

/**
 * Notification Service
 * @export
 * @class NotificationService
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  /**
   * Notification Model Array
   * @private
   * @type {NotificationModel[]}
   * @memberof NotificationService
   */
  private notificationModel: NotificationModel[] = [];

  /**
   * Notification Updated
   * @private
   * @memberof NotificationService
   */
  private notificationUpdated = new Subject<NotificationModel[]>();

  /**
   * Get Notifications
   * @memberof NotificationService
   */
  getNotifications() {
    this.http.post('https://geeksreads.herokuapp.com/api/users/Notifications', {
        token: localStorage.getItem('token'),
      })
      .subscribe((serverResponse: any) => {
        this.notificationModel = serverResponse;
        this.notificationUpdated.next([...this.notificationModel]);
      }
        , (error: { json: () => void; }) => {
          console.log(error);
        });
  }

  /**
   * Get Notifications Updated
   * @returns
   * @memberof NotificationService
   */
  getNotificationUpdated() {
    return this.notificationUpdated.asObservable();
  }

  /**
   * Creates an instance of NotificationService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof NotificationService
   */
  constructor(private http: HttpClient, private router: Router) { }
}
