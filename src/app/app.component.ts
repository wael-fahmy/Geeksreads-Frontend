import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

/**
 *
 * App Component
 * @export
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * Application Title
   */
  title = 'geeksreads';
}
