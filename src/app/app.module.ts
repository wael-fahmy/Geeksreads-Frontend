import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileBookEntityComponent } from './profile-book-entity/profile-book-entity.component';
import { ProfileEntityComponent } from './profile-entity/profile-entity.component';
import { BookComponent } from './book/book.component';
import { BookEntityComponent } from './book-entity/book-entity.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomepageComponent,
    ProfileComponent,
    ProfileBookEntityComponent,
    ProfileEntityComponent,
    BookComponent,
    BookEntityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
