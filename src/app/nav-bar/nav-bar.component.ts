import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { SearchService } from './search.service';

/**
 *  Navbar Component
 *  @export
 *  @class NavBarComponent
 *  @implements {OnInit}
 */
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {
  isSignedIn: boolean;
  userName: string;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  formdata: FormGroup;

  searchText: FormControl;

  search(formData) {
    console.log('Searching...');
    this.searchService.search(formData.searchText);
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /**
   *  Creates an instance of NavBarComponent.
   *  @memberof NavBarComponent
   */
  constructor(private dataSharingService: DataSharingService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public searchService: SearchService) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isSignedIn = value;
    });
    this.dataSharingService.userName.subscribe(value => {
      this.userName = value;
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  /**
   *  Angular ngOnInit
   *  @memberof NavBarComponent
   */
  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.isSignedIn = false;
    } else {
      this.isSignedIn = true;
    }
    this.searchText = new FormControl('', Validators.required);
    this.formdata = new FormGroup({
      searchText: this.searchText,
    });
  }
}
