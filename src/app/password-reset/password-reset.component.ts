import { Component, OnInit } from '@angular/core';
import { PasswordResetService } from './password-reset.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  /**
   * Later
   * @type {boolean}
   * @memberof PasswordResetComponent
   */
  hide = true;

  requestSuccess: boolean;

  formdata: FormGroup;

  email: FormControl;

  password: FormControl;

  token: FormControl;

  /**
   * test request for sign in
   * @memberof Password
   */
  updatePassword(formData) {
    this.passwordResetService.updatePassword(formData.email, formData.password, formData.token);
    this.requestSuccess = true;
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
        ? 'Not a valid email'
        : '';
  }

  passwordvalidation(formcontrol) {
    if (formcontrol.value.length < 6) {
      return { password: true };
    }
  }

  constructor(private http: HttpClient, public passwordResetService: PasswordResetService) { }

  ngOnInit() {
    this.requestSuccess = false;
    this.password = new FormControl('', this.passwordvalidation);
    this.token = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*\.[a-z]+')
    ]));
    this.formdata = new FormGroup({
      email: this.email,
      password: this.password,
      token: this.token
    });
  }

}
