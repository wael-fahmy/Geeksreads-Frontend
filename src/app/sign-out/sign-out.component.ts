import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../nav-bar/data-sharing.service';

/**
 *  Signout Component
 *  @export
 *  @class SignOutComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent implements OnInit {

  /**
   *  Creates an instance of SignOutComponent.
   *  @memberof SignOutComponent
   */
  constructor(private dataSharingService: DataSharingService) { }

  /**
   *  Angular ngOnInit
   * @memberof SignOutComponent
   */
  ngOnInit() {
    // TODO: Send Request
    this.dataSharingService.isUserLoggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

}
