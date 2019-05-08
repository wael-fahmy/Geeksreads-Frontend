import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditService {


  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    const data= {

      token:localStorage.getItem('token')
    }
    return this.http.post('https://geeksreads.herokuapp.com/api/users/me', data);
}


updateProfile(birthDate,userName,photo): Observable<any> {
  const data= {
    token:localStorage.getItem('token'),
    NewUserBirthDate:birthDate,
    NewUserName:userName,
    NewUserPhoto:photo
  }
  return this.http.post('https://geeksreads.herokuapp.com/api/users/update', data);
}


updatepassword(oldpassword,newpassword): Observable<any> {
  const data= {
    token:localStorage.getItem('token'),
    OldUserPassword:oldpassword,
    NewUserPassword:newpassword
  }
  return this.http.post('https://geeksreads.herokuapp.com/api/users/UpdateUserPassword',data);
}





/*
  getUserData()
  {
    const data={

      token:localStorage.getItem('token')
    }
    this.http
      .post('https://geeksreads.herokuapp.com/api/users/me',data )
      .subscribe((serverResponse) => {
      }, error => {
        console.log(error);
        alert(error.error.ReturnMsg);
      });
  } */


}
