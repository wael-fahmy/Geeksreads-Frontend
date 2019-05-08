import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchModel } from './search-model';
import { SearchService } from './search.service';
import { Subscription } from 'rxjs';

/**
 * Search Component
 * @export
 * @class SearchComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  /**
   * Search Term from URL
   * @memberof SearchComponent
   */
  snapshotParam = 'initial value';

  /**
   * Are there results?
   * @memberof SearchComponent
   */
  results = true;

  /**
   * Subscription
   * @private
   * @type {Subscription}
   * @memberof SearchComponent
   */
  private searchSubscription: Subscription;

  /**
   * Search Model
   * @type {SearchModel[][]}
   * @memberof SearchComponent
   */
  public searchModel: SearchModel[][];

  /**
   * Creates an instance of SearchComponent.
   * @param {SearchService} searchService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof SearchComponent
   */
  constructor(public searchService: SearchService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) { }

  /**
   * Angular Init
   * @memberof SearchComponent
   */
  ngOnInit() {
    this.snapshotParam = this.route.snapshot.paramMap.get('query');
    this.searchService.search(this.snapshotParam);
    this.searchSubscription = this.searchService.getSearchUpdated()
      .subscribe((searchInformation: any) => {
        this.searchModel = searchInformation;
        if (this.searchModel[0].length === 0 && this.searchModel[1].length === 0) {
          this.results = false;
        } else {
          this.results = true;
        }
      }, (error: { json: () => void; }) => {
        console.log(error);
      });
  }
}
