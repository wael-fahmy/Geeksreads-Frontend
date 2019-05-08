import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { NotificationModel } from '../notification-model';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  /**
   * Is a user signed in
   * @type {boolean}
   * @memberof NavBarComponent
   */
  isSignedIn: boolean;

  /**
   * User Name
   * @type {string}
   * @memberof NavBarComponent
   */
  userName: string;

  /**
   * Is there a token
   * @type {boolean}
   * @memberof NavBarComponent
   */
  isToken: boolean;

  /**
   * Mobile Query
   * @type {MediaQueryList}
   * @memberof NavBarComponent
   */
  mobileQuery: MediaQueryList;

  /**
   * How many notifications were unseen
   * @memberof NavBarComponent
   */
  unseenNotifications = 0;

  /**
   * Mobile Listener
   * @private
   * @memberof NavBarComponent
   */
  private _mobileQueryListener: () => void;

  /**
   * Form Group
   * @type {FormGroup}
   * @memberof NavBarComponent
   */
  formdata: FormGroup;

  /**
   * Search Text
   * @type {FormControl}
   * @memberof NavBarComponent
   */
  searchText: FormControl;

  /**
   * Form Group
   * @type {FormGroup}
   * @memberof NavBarComponent
   */
  formdata2: FormGroup;

  /**
   * Search Text
   * @type {FormControl}
   * @memberof NavBarComponent
   */
  searchText2: FormControl;

  /**
   * Notification Subscription
   * @private
   * @type {Subscription}
   * @memberof NavBarComponent
   */
  private notificationSubscription: Subscription;

  /**
   * Notifications Model
   * @type {NotificationModel[]}
   * @memberof NavBarComponent
   */
  public notificationsModel: NotificationModel[] = [];

  /**
   * Search using query
   * @param {*} formData
   * @memberof NavBarComponent
   */
  search(formData) {
    this.router.navigate(['/search', formData.searchText]);
  }

  /**
   * Search using query
   * @param {*} formData2
   * @memberof NavBarComponent
   */
  search2(formData2) {
    this.router.navigate(['/search', formData2.searchText2]);
  }

  /**
   * Get user notifications
   * @returns
   * @memberof AppComponent
   */
  getNotifications() {
    if (localStorage.getItem('token') === null) {
      return;
    }

    this.notificationService.getNotifications();
    this.notificationSubscription = this.notificationService.getNotificationUpdated()
      .subscribe((notificationInformation: NotificationModel[]) => {
        this.notificationsModel = notificationInformation;
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }


  /**
   * Angular Destroy
   * @memberof NavBarComponent
   */
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   *  Creates an instance of NavBarComponent.
   *  @memberof NavBarComponent
   */
  constructor(private dataSharingService: DataSharingService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private router: Router,
              public notificationService: NotificationService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isSignedIn = value;
    });

    this.dataSharingService.userName.subscribe(value => {
      this.userName = value;
    });

    this.mobileQuery = media.matchMedia('(max-width: 831px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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

    if (localStorage.getItem('token') !== null) {
      this.isToken = true;
    }

    this.searchText = new FormControl('', Validators.required);
    this.formdata = new FormGroup({
      searchText: this.searchText,
    });

    this.searchText2 = new FormControl('', Validators.required);
    this.formdata2 = new FormGroup({
      searchText2: this.searchText2,
    });

    this.getNotifications();

    let not = this.getNotifications.bind(this);
    setInterval(not, 15000);
  }
}
