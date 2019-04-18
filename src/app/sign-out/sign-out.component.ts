import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  constructor() { }

  /**
   *  Angular ngOnInit
   * @memberof SignOutComponent
   */
  ngOnInit() {
    // TODO: Send Request
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

}
