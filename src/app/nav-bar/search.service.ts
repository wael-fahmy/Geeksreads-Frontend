import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SearchModel } from './search-model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchModel: SearchModel;

  private searchUpdated = new Subject<SearchModel>();

  search(searchParam: string) {
    console.log(searchParam);
    this.http
      .get('https://geeksreads.herokuapp.com/api/search', {
        params: {
          search_param: searchParam,
        }
      })
      .subscribe((serverResponse: SearchModel) => {
        console.log(serverResponse);
        this.searchModel = serverResponse;
        this.searchUpdated.next(this.searchModel);
      }
        , (error: { json: () => void; }) => {
          console.log(error);
        });
  }

  getSearchUpdated() {
    return this.searchUpdated.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }
}
