import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { BookComponent } from './book/book.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { GenreComponent } from './genre/genre.component';
import { GenresComponent } from './genres/genres.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { AuthorComponent } from './author/author.component';
import {ProfileReadShelfComponent} from './profile-read-shelf/profile-read-shelf.component';
import {ReviewsComponent} from './reviews/reviews.component';
import { VerifiedComponent } from './verified/verified.component';
import { VerificationComponent } from './verification/verification.component';

const routes: Routes = [
  {
    path: '',
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
    path: 'book',
    component: BookComponent
  },
  {
    path: 'reviews',
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
    path: 'genre',
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
    path: 'author',
    component: AuthorComponent
  },
  {
    path: 'verified',
    component: VerifiedComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
