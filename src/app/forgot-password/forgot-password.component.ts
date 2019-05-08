import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

/**
 * Forgot Password Component
 * @export
 * @class ForgotPasswordComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  /**
   * Email Boolean
   * @memberof ForgotPasswordComponent
   */
  hide = true;

  /**
   * Was the request successful
   * @type {boolean}
   * @memberof ForgotPasswordComponent
   */
  requestSuccess: boolean;

  /**
   * Form Group
   * @type {FormGroup}
   * @memberof ForgotPasswordComponent
   */
  formdata: FormGroup;

  /**
   * Email
   * @type {FormControl}
   * @memberof ForgotPasswordComponent
   */
  email: FormControl;

  /**
   * Checks email
   * @memberof ForgotPasswordComponent
   */
  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  /**
   * Request Password
   * @param {*} formData
   * @memberof ForgotPasswordComponent
   */
  requestNewPassword(formData) {
    try {
      this.forgotPasswordService.forgotPassword(formData.email);
    } catch (error) {
      this.requestSuccess = false;
      return;
    }
    this.requestSuccess = true;
  }

  /**
   * Creates an instance of ForgotPasswordComponent.
   * @param {HttpClient} http
   * @param {ForgotPasswordService} forgotPasswordService
   * @memberof ForgotPasswordComponent
   */
  constructor(private http: HttpClient, public forgotPasswordService: ForgotPasswordService) { }

  /**
   * Angular Init
   * @memberof ForgotPasswordComponent
   */
  ngOnInit() {
    this.requestSuccess = false;
    this.email = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*\.[a-z]+')
    ]));
    this.formdata = new FormGroup({
      email: this.email,
    });
  }
}
