import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SearchModel } from './search-model';
import { Subject } from 'rxjs';

/**
 * Search Service Class
 * @export
 * @class SearchService
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  /**
   * Search Model
   * @private
   * @type {SearchModel}
   * @memberof SearchService
   */
  private searchModel: SearchModel;

  /**
   * Search Updated Model
   * @private
   * @memberof SearchService
   */
  private searchUpdated = new Subject<SearchModel>();

  /**
   * Search Function
   * @param {string} searchParam
   * @memberof SearchService
   */
  search(searchParam: string) {
    console.log(searchParam);
    this.http.get('https://geeksreads.herokuapp.com/api/search/', {
      params: {
        search_param: searchParam,
      }
    }).subscribe((serverResponse: SearchModel) => {
      this.searchModel = serverResponse;
      this.searchUpdated.next(this.searchModel);
    }, (error: { json: () => void; }) => {
      console.log(error);
    });
  }

  /**
   * Search Updated Function
   * @returns
   * @memberof SearchService
   */
  getSearchUpdated() {
    return this.searchUpdated.asObservable();
  }

  /**
   * Creates an instance of SearchService.
   * @param {HttpClient} http
   * @param {Router} router
   * @memberof SearchService
   */
  constructor(private http: HttpClient, private router: Router) { }
}
