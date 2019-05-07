import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel } from './notification-model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationModel: NotificationModel[] = [];

  private notificationUpdated = new Subject<NotificationModel[]>();

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

  getNotificationUpdated() {
    return this.notificationUpdated.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }
}
