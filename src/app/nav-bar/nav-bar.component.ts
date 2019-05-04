import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { DataSharingService } from './data-sharing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

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
  isToken: boolean;
  mobileQuery: MediaQueryList;

  // tslint:disable-next-line: variable-name
  private _mobileQueryListener: () => void;

  formdata: FormGroup;
  searchText: FormControl;

  formdata2: FormGroup;
  searchText2: FormControl;

  search(formData) {
    this.router.navigate(['/search', formData.searchText]);
  }

  search2(formData2) {
    this.router.navigate(['/search', formData2.searchText2]);
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
              private router: Router) {
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isSignedIn = value;
    });

    this.dataSharingService.userName.subscribe(value => {
      this.userName = value;
    });

    this.mobileQuery = media.matchMedia('(max-width: 831px)');
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
    if (localStorage.getItem('token') !== null) {
      this.isToken = true;
    }
    this.searchText = new FormControl('', Validators.required);
    this.formdata = new FormGroup({
      searchText: this.searchText,
    });

    this.searchText2 = new FormControl('', Validators.required);
    this.formdata2 = new FormGroup({
      searchText2: this.searchText2,
    });
  }
}
