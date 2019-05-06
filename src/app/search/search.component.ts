import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchModel } from './search-model';
import { SearchService } from './search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  snapshotParam = 'initial value';

  results = true;

  private searchSubscription: Subscription;

  public searchModel: SearchModel[][];

  constructor(public searchService: SearchService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) { }

  ngOnInit() {
    this.snapshotParam = this.route.snapshot.paramMap.get('query');
    this.searchService.search(this.snapshotParam);
    this.searchSubscription = this.searchService.getSearchUpdated()
      .subscribe((searchInformation: any) => {
        this.searchModel = searchInformation;
        // console.log(this.searchModel);
        // console.log(searchInformation);
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
