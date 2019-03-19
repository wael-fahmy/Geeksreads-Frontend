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
import { BookCommentGuestComponent } from './book-comment-guest/book-comment-guest.component';
import { BookCommentUserComponent } from './book-comment-user/book-comment-user.component';
import { BookSuggestionComponent } from './book-suggestion/book-suggestion.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookAuthorComponent } from './book-author/book-author.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { GenreComponent } from './genre/genre.component';
import { GenresComponent } from './genres/genres.component';
import { GenreRowComponent } from './genre-row/genre-row.component';

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
    BookCommentGuestComponent,
    BookCommentUserComponent,
    BookSuggestionComponent,
    BookDetailsComponent,
    BookAuthorComponent,
    SignInComponent,
    SignUpComponent,
    SignOutComponent,
    GenreComponent,
    GenresComponent,
    GenreRowComponent,
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
