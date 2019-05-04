import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorBookComponent } from './author-book/author-book.component';
import { AuthorComponent } from './author/author.component';
import { BookAuthorComponent } from './book-author/book-author.component';
import { BookCommentGuestComponent } from './book-comment-guest/book-comment-guest.component';
import { BookCommentUserComponent } from './book-comment-user/book-comment-user.component';
import { BookComponent } from './book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEntityComponent } from './book-entity/book-entity.component';
import { BookGenreComponent } from './book-genre/book-genre.component';
import { BookSuggestionComponent } from './book-suggestion/book-suggestion.component';
import { BookSuggestionOtherComponent } from './book-suggestion-other/book-suggestion-other.component';
import { CommentComponent } from './comment/comment.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GenreComponent } from './genre/genre.component';
import { GenreRowComponent } from './genre-row/genre-row.component';
import { GenresComponent } from './genres/genres.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewsfeedCommentPostComponent } from './newsfeed-comment-post/newsfeed-comment-post.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NewsfeedPostComponent } from './newsfeed-post/newsfeed-post.component';
import { ProfileBookEntityComponent } from './profile-book-entity/profile-book-entity.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileEntityComponent } from './profile-entity/profile-entity.component';
import { ProfileReadShelfComponent } from './profile-read-shelf/profile-read-shelf.component';
import { ProfileReadingShelfComponent } from './profile-reading-shelf/profile-reading-shelf.component';
import { ProfileWantToReadShelfComponent } from './profile-want-to-read-shelf/profile-want-to-read-shelf.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReviewComponent } from './review/review.component';
import { ReviewsCommentsComponent } from './reviews-comments/reviews-comments.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewsEntityComponent } from './reviews-entity/reviews-entity.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerificationComponent } from './verification/verification.component';
import { VerifiedComponent } from './verified/verified.component';
import { OtherUserProfileEntityComponent } from './other-user-profile-entity/other-user-profile-entity.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { DataSharingService } from './nav-bar/data-sharing.service';
import { ProfileEditService } from './profile-edit/profile-edit.service';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorBookComponent,
    AuthorComponent,
    BookAuthorComponent,
    BookCommentGuestComponent,
    BookCommentUserComponent,
    BookComponent,
    BookDetailsComponent,
    BookEntityComponent,
    BookGenreComponent,
    BookSuggestionComponent,
    BookSuggestionOtherComponent,
    CommentComponent,
    FooterComponent,
    ForgotPasswordComponent,
    GenreComponent,
    GenreRowComponent,
    GenresComponent,
    HomepageComponent,
    NavBarComponent,
    NewsfeedCommentPostComponent,
    NewsfeedComponent,
    NewsfeedPostComponent,
    ProfileBookEntityComponent,
    ProfileComponent,
    ProfileEditComponent,
    ProfileEntityComponent,
    ProfileReadShelfComponent,
    ProfileReadShelfComponent,
    ProfileReadingShelfComponent,
    ProfileWantToReadShelfComponent,
    ReviewComponent,
    ReviewsCommentsComponent,
    ReviewsComponent,
    ReviewsEntityComponent,
    SignInComponent,
    SignOutComponent,
    SignUpComponent,
    VerificationComponent,
    VerifiedComponent,
    OtherUserProfileEntityComponent,
    PasswordResetComponent,
    SearchComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    DataSharingService,
    ProfileEditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
