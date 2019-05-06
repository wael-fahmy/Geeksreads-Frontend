import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {Bookreviews} from './review.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ReviewService {

constructor(private http: HttpClient, private router: Router) { }

    post_Like_Review(ReviewID: string) {
        if (localStorage.getItem('userId') === null) {
            this.router.navigate(['/sign-in']);
            return;
        }
// tslint:disable-next-line: max-line-length
        const UserToken = {
            resourceId: ReviewID,
            token: localStorage.getItem('token')
        };
        this.http.post<{ message: string}>('https://geeksreads.herokuapp.com/api/resources/like', UserToken).
        subscribe(responseData => {          //  subscribe the list of books recieved
        console.log(responseData);    // assign them to the list to display them
        });
    }
}
