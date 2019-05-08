import { AuthorComponent } from './author/author.component';
import { BookComponent } from './book/book.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GenreComponent } from './genre/genre.component';
import { GenresComponent } from './genres/genres.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { NgModule } from '@angular/core';
import { OtherUserProfileEntityComponent } from './other-user-profile-entity/other-user-profile-entity.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileReadShelfComponent } from './profile-read-shelf/profile-read-shelf.component';
import { ProfileReadingShelfComponent } from './profile-reading-shelf/profile-reading-shelf.component';
import { ProfileWantToReadShelfComponent } from './profile-want-to-read-shelf/profile-want-to-read-shelf.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VerificationComponent } from './verification/verification.component';
import { VerifiedComponent } from './verified/verified.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full'
  },
  {
    path: 'homepage',
    component: HomepageComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile-read-shelf',
    component: ProfileReadShelfComponent
  },
  {
    path: 'profile-reading-shelf',
    component: ProfileReadingShelfComponent
  },
  {
    path: 'profile-want-to-read-shelf',
    component: ProfileWantToReadShelfComponent
  },
  {
    path: 'other-user-profile-entity/:userid',
    component: OtherUserProfileEntityComponent
  },
  {
    path: 'book/:bookid',
    component: BookComponent
  },
  {
    path: 'reviews/:reviewid/:bookid',
    component: ReviewsComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-out',
    component: SignOutComponent
  },
  {
    path: 'genre/:genreName',
    component: GenreComponent
  },
  {
    path: 'genres',
    component: GenresComponent
  },
  {
    path: 'newsfeed',
    component: NewsfeedComponent
  },
  {
    path: 'profile-edit',
    component: ProfileEditComponent
  },
  {
    path: 'authors/:author',
    component: AuthorComponent
  },
  {
    path: 'verified',
    component: VerifiedComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent
  },
  {
    path: 'search/:query',
    component: SearchComponent,
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
