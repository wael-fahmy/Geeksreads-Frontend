import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PasswordResetService } from './password-reset.service';

/**
 * Password Reset Component
 * @export
 * @class PasswordResetComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  /**
   * Was the request successful
   * @type {boolean}
   * @memberof PasswordResetComponent
   */
  requestSuccess: boolean;

  /**
   * Form Group
   * @type {FormGroup}
   * @memberof PasswordResetComponent
   */
  formdata: FormGroup;

  /**
   * Password Input
   * @type {FormControl}
   * @memberof PasswordResetComponent
   */
  password: FormControl;

  /**
   * Token
   * @type {FormControl}
   * @memberof PasswordResetComponent
   */
  token: FormControl;

  /**
   *
   * @param {*} formData
   * @memberof PasswordResetComponent
   */
  updatePassword(formData) {
    try {
      this.passwordResetService.updatePassword(formData.password, formData.token);
    } catch (error) {
      return;
    }
    this.requestSuccess = true;
  }

  /**
   * Validate Password < 6
   * @param {*} formcontrol
   * @returns
   * @memberof PasswordResetComponent
   */
  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 6) {
      return { password: true };
    }
  }

  /**
   * Creates an instance of PasswordResetComponent.
   * @param {HttpClient} http
   * @param {PasswordResetService} passwordResetService
   * @memberof PasswordResetComponent
   */
  constructor(private http: HttpClient, public passwordResetService: PasswordResetService) { }

  /**
   * Angular Init
   * @memberof PasswordResetComponent
   */
  ngOnInit() {
    this.requestSuccess = false;
    this.password = new FormControl('', this.passwordvalidation);
    this.token = new FormControl('', Validators.required);
    this.formdata = new FormGroup({
      password: this.password,
      token: this.token
    });
  }
}
