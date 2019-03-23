import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  userName = '';
  userEmail = '';
  userPassword = '';
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : '';
  }
  onSigningUp(form: NgForm){
    if (form.invalid) {
      return;
    }
    console.log('Signing Up...');
  }
  constructor() { }

  ngOnInit() {
  }

}
