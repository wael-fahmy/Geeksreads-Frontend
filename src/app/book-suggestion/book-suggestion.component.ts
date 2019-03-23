import { Component, OnInit } from '@angular/core';
import {SuggestedAuthorBookDetails} from './book-suggestion.model';
import {Subscription} from 'rxjs';
import {SuggestedauthorBook_Service} from './book-suggestion.service';
import { delay } from 'q';

@Component({
  selector: 'app-book-suggestion',
  templateUrl: './book-suggestion.component.html',
  styleUrls: ['./book-suggestion.component.css']
})
export class BookSuggestionComponent implements OnInit {

 // tslint:disable-next-line:one-variable-per-declaration
   // tslint:disable-next-line:variable-name
   private Sub_profile: Subscription;
   // tslint:disable-next-line:variable-name
   public suggestedauthorbook_details: SuggestedAuthorBookDetails[] = [];
   // tslint:disable-next-line:no-shadowed-variable tslint:disable-next-line:variable-name
   // tslint:disable-next-line:variable-name
   constructor(public suggestedauthorsook_service: SuggestedauthorBook_Service )  {}
   ngOnInit() {
     // tslint:disable-next-line:max-line-length
     this.suggestedauthorsook_service.get_suggestedauthorbook_Info();                                  // to get the user info from the service
     // tslint:disable-next-line:variable-name
     // tslint:disable-next-line:max-line-length
     this.Sub_profile = this.suggestedauthorsook_service.get_suggestedauthorbook_Info_updated().subscribe( (suggestedauthorbookinformation: SuggestedAuthorBookDetails[]) => {
         this.suggestedauthorbook_details = suggestedauthorbookinformation;
         /* console.log(this.User_info.User_Name)
         console.log(this.User_info.user_id)
         console.log(this.User_info.User_Photo)*/
     });
   }

}
