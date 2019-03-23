import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  userEmail = '';
  userPassword = '';
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : '';
  }
  onSigningIn(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('Signing In...');
  }
  constructor() { }

  ngOnInit() {
  }

}
