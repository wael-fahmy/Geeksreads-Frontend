import { Component, OnInit, OnDestroy } from '@angular/core';
import {CountBooksService} from '../profile-book-entity/book.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  num_to_read=0
  num_read=0
  private Sub : Subscription
  private Sub2 : Subscription

constructor(public CountBooksService : CountBooksService )
{

}
ngOnInit()
{

 this.Sub = this.CountBooksService.get_count_update_read().
  subscribe( (num_read:number) => {
     this.num_read=num_read;
 });

 this.Sub2 = this.CountBooksService.get_count_update_want_to_read().
 subscribe( (num_to_read:number) => {
    this.num_to_read=num_to_read;
});
 
}

ngOnDestroy(){
 this.Sub.unsubscribe();
 this.Sub2.unsubscribe();
}

}
