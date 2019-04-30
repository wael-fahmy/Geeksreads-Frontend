import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  hide = true;

  requestSuccess: boolean;

  formdata: FormGroup;

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

  requestNewPassword(formData) {
    this.forgotPasswordService.forgotPassword(formData.email);
    this.requestSuccess = true;
  }

  constructor(private http: HttpClient, public forgotPasswordService: ForgotPasswordService) { }

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
